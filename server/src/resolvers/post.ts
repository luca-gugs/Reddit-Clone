import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  UseMiddleware,
} from 'type-graphql';
import { getConnection } from 'typeorm';
import { Post } from '../entities/Post';
import { Updoot } from '../entities/Updoot';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@InputType()
class PostInput {
  @Field()
  title: string;
  @Field()
  text: string;
  @Field({ nullable: true })
  anon: boolean;
}

@ObjectType()
class PaginatedPosts {
  @Field(() => [Post])
  posts: Post[];
  @Field()
  hasMore: boolean;
}

@Resolver()
export class PostResolver {
  //Return Paginated Posts
  @Query(() => PaginatedPosts)
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;

    const replacements: any[] = [realLimitPlusOne];

    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
    }

    //public.user -- EXPLAINED
    //In postgress there are multiple schemas inside of a db
    //You have to specify you want public table
    const posts = await getConnection().query(
      `
    select p.*, 
    json_build_object(
      'id', u.id, 
      'handle', u.handle,
      'createdAt', u."createdAt",
      'updatedAt', u."updatedAt"
      ) creator
    from post p
    inner join public.user u on u.id = p."creatorId"
    ${cursor ? `where p."createdAt" < $2` : ''}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );

    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  //Vote
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async vote(
    @Arg('postId', () => Int) postId: number,
    @Arg('value', () => Int) value: number,
    @Ctx() { req }: MyContext
  ) {
    const isUpdoot = value !== -1;
    const realValue = isUpdoot ? 1 : -1;
    const { userId } = req.session;
    await Updoot.insert({ userId, postId, value: realValue });
    getConnection().query(
      `
    START TRANSACTION;
    
    insert into updoot ("userId", "postId", value)
    values (${userId}, ${postId}, ${realValue});

    update post
    set points = points + ${realValue}
    where id = ${postId};
    COMMIT;
    `
    );
    return true;
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
