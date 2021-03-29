import { ApolloServer } from 'apollo-server-express';
import connectRedis from 'connect-redis';
import cors from 'cors';
import 'dotenv-safe/config';
import express from 'express';
import session from 'express-session';
import http from 'http';
import Redis from 'ioredis';
import path from 'path';
import 'reflect-metadata';
import { buildSchema } from 'type-graphql';
import { createConnection } from 'typeorm';
import { COOKIE_NAME } from './constants';
import { Comment } from './entities/Comment';
import { Message } from './entities/Message';
import { Post } from './entities/Post';
import { Room, RoomMember } from './entities/Room';
import { Updoot } from './entities/Updoot';
import { User } from './entities/User';
import { CommentResolver } from './resolvers/comment';
import { HelloResolver } from './resolvers/hello';
import { MessageResolver } from './resolvers/message';
import { PostResolver } from './resolvers/post';
import { RoomResolver } from './resolvers/room';
import { UserResolver } from './resolvers/user';
import { createUpdootLoader } from './utils/DataLoaders/createUpdootLoader';
import { createUserLoader } from './utils/DataLoaders/createUserLoader';

require('dotenv').config();

const main = async () => {
  const conn = await createConnection({
    type: 'postgres',
    url: process.env.DATABASE_URL,
    logging: true,
    synchronize: true,
    migrations: [path.join(__dirname, './migrations/*')],
    entities: [Post, User, Updoot, Comment, Room, RoomMember, Message],
  });
  await conn.runMigrations();
  // await Post.delete({});

  const app = express();
  const httpServer = http.createServer(app);

  const RedisStore = connectRedis(session);
  const redis = new Redis(process.env.REDIS_URL);
  app.set('trust proxy', 1);
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN,
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
        // domain: __prod__ ? '.cacs.pro' : undefined,
      },
      saveUninitialized: false,
      secret: process.env.REDIS_SESSION_SECRET,
      resave: false,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({
      resolvers: [
        HelloResolver,
        UserResolver,
        PostResolver,
        CommentResolver,
        RoomResolver,
        MessageResolver,
      ],
      validate: false,
    }),
    context: ({ req, res }) => ({
      req,
      res,
      redis,
      userLoader: createUserLoader(),
      updootLoader: createUpdootLoader(),
    }),
    subscriptions: {
      path: '/subscriptions',
      onConnect: () => {
        console.log('Client connected for subscriptions');
      },
      onDisconnect: () => {
        console.log('Client disconnected from subscriptions');
      },
    },
  });

  apolloServer.applyMiddleware({
    app,
    cors: false,
  });

  apolloServer.installSubscriptionHandlers(httpServer);

  httpServer.listen(parseInt(process.env.PORT), () => {
    console.log('server started on localhost:4000');
    console.log(
      `Subscriptions ready at ws://localhost:${process.env.PORT}${apolloServer.subscriptionsPath}`
    );
  });
};

main().catch(err => {
  console.error(err);
});
