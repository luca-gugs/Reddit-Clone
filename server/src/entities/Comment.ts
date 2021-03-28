import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './Post';
import { User } from './User';

@ObjectType()
@Entity()
export class Comment extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @Column({ nullable: true })
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.comments)
  creator: User;

  @Field()
  @Column()
  postId: number;

  @Field(() => Post)
  @ManyToOne(() => Post, post => post.comments, {
    onDelete: 'CASCADE',
  })
  post: Post;

  @Field()
  @Column({ default: false })
  anon: Boolean;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();
}
