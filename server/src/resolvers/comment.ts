import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Comment } from '../entities/Comment';
import { isAuth } from '../middleware/isAuth';

@InputType()
class CommentInput {
  @Field()
  text!: string;
  @Field(() => Int)
  postId!: number;
  @Field({ nullable: true })
  anon: boolean;
}

@Resolver()
export class CommentResolver {
  //Within a Resolver we can either do querys or mutations
  //In GraphQL we define what our query returns
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addComment(
    @Arg('input') input: CommentInput,
    @Ctx() { req }: MyContext
  ): Promise<Comment | Error | Boolean> {
    await getConnection().transaction(async tm => {
      await tm.query(
        `
  insert into comment ("text", "postId", "creatorId")
  values ($1, $2, $3)
      `,
        [input.text, input.postId, req.session.userId]
      );

      await tm.query(
        `
      update post
      set "commentCount" = "commentCount" + 1
      where id = $1
        `,
        [input.postId]
      );
    });

    return true;
  }
}
