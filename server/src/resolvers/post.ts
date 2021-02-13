import { isAuth } from '../middleware/isAuth';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { Post } from '../entities/Post';
import { MyContext } from '../types';

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
}

@Resolver()
export class PostResolver {
  //Return All Posts
  @Query(() => [Post])
  async posts(): Promise<Post[]> {
    return Post.find();
  }

  //Return Post By ID
  @Query(() => Post, { nullable: true })
  post(@Arg('id') id: number): Promise<Post | undefined> {
    return Post.findOne(id);
  }

  //Create Post
  @Mutation(() => Post)
  @UseMiddleware(isAuth)
  async createPost(
    @Arg('input') input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> {
    return Post.create({ ...input, creatorId: req.session.userId }).save();
  }

  //Update Post
  @Mutation(() => Post, { nullable: false })
  async updatePost(
    @Arg('id') id: number,
    @Arg('input') input: PostInput
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null;
    }
    if (typeof input.title !== 'undefined' && typeof input.text !== undefined) {
      await Post.update({ id }, { ...input });
    }
    return post;
  }

  //Delete Post
  @Mutation(() => Boolean)
  async deletePost(@Arg('id') id: number): Promise<boolean> {
    await Post.delete(id);
    return true;
  }
}
