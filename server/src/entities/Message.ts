import { Field, ObjectType, Int } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Room } from './Room';
import { User } from './User';

@ObjectType()
@Entity()
export class Message extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column()
  text!: string;

  @Field()
  @PrimaryColumn()
  creatorId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.messages)
  creator: User;

  @Field()
  @PrimaryColumn()
  roomId: number;

  @Field(() => Room)
  @ManyToOne(() => Room, room => room.messages, {
    onDelete: 'CASCADE',
  })
  room: Room;

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();
}
