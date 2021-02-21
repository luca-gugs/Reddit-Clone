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
import { Comment } from '../entities/Comment';
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

@ObjectType()
class SinglePost {
  @Field()
  post: Post;
  @Field(() => [Comment])
  comments: Comment[];
}

@Resolver()
export class PostResolver {
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

    const updoot = await Updoot.findOne({ where: { postId, userId } });

    // the user has voted on the post before
    // and they are changing their vote
    if (updoot && updoot.value !== realValue) {
      await getConnection().transaction(async tm => {
        await tm.query(
          `
    update updoot
    set value = $1
    where "postId" = $2 and "userId" = $3
        `,
          [realValue, postId, userId]
        );

        await tm.query(
          `
          update post
          set points = points + $1
          where id = $2
        `,
          [2 * realValue, postId]
        );
      });
    } else if (!updoot) {
      // has never voted before
      await getConnection().transaction(async tm => {
        await tm.query(
          `
    insert into updoot ("userId", "postId", value)
    values ($1, $2, $3)
        `,
          [userId, postId, realValue]
        );

        await tm.query(
          `
    update post
    set points = points + $1
    where id = $2
      `,
          [realValue, postId]
        );
      });
    }
    return true;
  }
  //Return Paginated Posts
  @Query(() => PaginatedPosts)
  async posts(
    @Ctx() { req }: MyContext,
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<PaginatedPosts> {
    const realLimit = Math.min(50, limit);
    const realLimitPlusOne = realLimit + 1;
    const replacements: any[] = [realLimitPlusOne];

    if (req.session.userId) {
      replacements.push(req.session.userId);
    }
    let cursorIdx = 3;
    if (cursor) {
      replacements.push(new Date(parseInt(cursor)));
      cursorIdx = replacements.length;
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
      ) creator,
        ${
          req.session.userId
            ? '(select value from updoot where p."creatorId" = $2 and "postId" = p.id) "voteStatus"'
            : 'null as "voteStatus"'
        }
    from post p
    inner join public.user u on u.id = p."creatorId"

    ${cursor ? `where p."createdAt" < $${cursorIdx}` : ''}
    order by p."createdAt" DESC
    limit $1
    `,
      replacements
    );

    // const comments = await getConnection().query(`
    // select * from comment
    // where comment.id > 20
    // order by comment.id DESC
    // limit 5

    // `);

    const comments = await getConnection().query(`
    SELECT a.*
    FROM comment a
    LEFT OUTER JOIN comment b
        ON a.id = b.id     
    `);

    console.log(comments, 'COMMENTS');
    // console.log(posts, 'POSTS');
    return {
      posts: posts.slice(0, realLimit),
      hasMore: posts.length === realLimitPlusOne,
    };
  }

  //Return Post By ID
  // @Query(() => Post, { nullable: true })
  // async post(@Arg('id', () => Int) id: number): Promise<Post | undefined> {
  //   const comments = await getConnection().query(
  //     `
  //   SELECT a.*
  //   FROM comment a
  //   where a."postId" = $1
  //   `,
  //     [id]
  //   );
  //   console.log('COMMENTS: ', comments);
  //   return Post.findOne(id, { relations: ['creator'] });
  // }

  @Query(() => SinglePost, { nullable: true })
  async post(@Arg('id', () => Int) id: number): Promise<any | undefined> {
    const post = await Post.findOne(id, { relations: ['creator'] });
    const comments = await getConnection().query(
      `
    SELECT a.*,
    json_build_object(
      'id', u.id, 
      'handle', u.handle,
      'createdAt', u."createdAt",
      'updatedAt', u."updatedAt"
      ) creator

    FROM comment a
    inner join public.user u on u.id = a."creatorId"

    where a."postId" = $1
    `,
      [id]
    );
    console.log('COMMENT: ', comments);
    console.log('POZT: ', post);
    return { post: post, comments: comments };
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
  async deletePost(
    @Arg('id') id: number,
    @Ctx() { req }: MyContext
  ): Promise<boolean> {
    await Post.delete({ id, creatorId: req.session.userId });
    return true;
  }
}
