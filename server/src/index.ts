import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import express from 'express';
import session from 'express-session';
import Redis from 'ioredis';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME } from './constants';
import { Post } from './entities/Post';
import { User } from './entities/User';
import { HelloResolver } from './resolvers/hello';
import { PostResolver } from './resolvers/post';
import { UserResolver } from './resolvers/user';
require('dotenv').config();

const main = async () => {
  await createConnection({
    type: 'postgres',
    database: 'postgres',
    username: 'postgres',
    password: 'postgres',
    logging: true,
    synchronize: true,
    entities: [Post, User],
  });

  // const orm = await MikroORM.init(microConfig);
  // await orm.getMigrator().up();

  const app = express();

  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    })
  );

  //Redis Session
  app.use(
    //We can access the session in our revlovers
    //through the req, res in our server context
    session({
      name: COOKIE_NAME,
      store: new RedisStore({
        client: redis as any,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10, //10 years
        httpOnly: false,
        sameSite: 'lax', //for csrf
        secure: false, //cookie only works in https
      },
      saveUninitialized: false,
      secret: 'feiwhfiwhefhewfh',
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [HelloResolver, PostResolver, UserResolver],
      validate: false,
    }),
    //Context is a special object accessible to all resolvers
    //Passing orm.em to context
    context: ({ req, res }) => ({ req, res, redis }),
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  app.listen(4000, () => {
    console.log('server started on localhost:4000');
  });
};

main().catch(err => {
  console.error(err);
});
