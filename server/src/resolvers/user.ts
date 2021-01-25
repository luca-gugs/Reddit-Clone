import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  ObjectType,
  Query,
  Resolver,
} from 'type-graphql';
import { MyContext } from '../types';
import { User } from '../entities/User';
import argon2 from 'argon2';
import { EntityManager } from '@mikro-orm/postgresql';

@InputType()
class HandlePasswordInput {
  @Field()
  handle: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

@ObjectType()
class UserResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => User, { nullable: true })
  user?: User;
}

@Resolver()
export class UserResolver {
  //GetUserByCookie
  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    if (!req.session.userId) {
      return null;
    }
    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  //Register
  @Mutation(() => UserResponse)
  @Query(() => String)
  async register(
    @Arg('options') options: HandlePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    if (options.handle.length <= 2) {
      return {
        errors: [
          {
            field: 'handle',
            message: 'handles require at least 2 charachters',
          },
        ],
      };
    }
    if (options.password.length <= 5) {
      return {
        errors: [
          {
            field: 'password',
            message: 'password must be a minimum of 6 charachters',
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    let user;
    try {
      const result = await (em as EntityManager)
        .createQueryBuilder(User)
        .getKnexQuery()
        .insert({
          handle: options.handle,
          password: hashedPassword,
          created_at: new Date(),
          updated_at: new Date(),
        })
        .returning('*');
      user = result[0];
    } catch (err) {
      //Duplicate HandleError
      if (err.detail.includes('already exists')) {
        return {
          errors: [
            {
              field: 'handle',
              message: 'this handle has already been taken',
            },
          ],
        };
      }
    }
    //store user id session
    //this will set a cookie on the user
    // keep them logged in
    req.session.userId = user.id;

    return { user };
  }

  //Login
  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: HandlePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { handle: options.handle });
    //UserNotFound Error
    if (!user) {
      return {
        errors: [
          { field: 'handle', message: 'we cant find a user with this handle' },
        ],
      };
    }
    const valid = await argon2.verify(user.password, options.password);
    //InvalidPassword Error
    if (!valid) {
      return {
        errors: [{ field: 'password', message: 'not the correct password' }],
      };
    }
    req.session.userId = user.id;

    return { user };
  }
}
