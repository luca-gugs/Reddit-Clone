import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './Comment';
import { Message } from './Message';
import { Post } from './Post';
import { Room, RoomMember } from './Room';
import { Updoot } from './Updoot';

@ObjectType()
@Entity()
export class User extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ unique: true })
  handle!: string;

  @Field()
  @Column({ unique: true, default: null })
  email?: string;

  @Field()
  @Column()
  password!: string;

  @OneToMany(() => Post, post => post.creator)
  posts: Post[];

  @OneToMany(() => Room, room => room.creator)
  rooms: Room[];

  @OneToMany(() => RoomMember, roomMember => roomMember.user)
  roomAsMember: RoomMember[];

  @OneToMany(() => Updoot, updoot => updoot.user)
  updoots: Updoot[];

  @OneToMany(() => Message, message => message.creator)
  messages: Message[];

  @OneToMany(() => Comment, comment => comment.creator)
  comments: Comment[];

  // @Field(() => User)
  // @ManyToOne(() => Room, room => room.members)
  // member: User;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}
