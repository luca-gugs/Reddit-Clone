import { Field, Int, ObjectType } from 'type-graphql';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Message } from './Message';
import { User } from './User';

@ObjectType()
@Entity()
export class Room extends BaseEntity {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id?: number;

  @Field()
  @Column({ unique: true })
  title!: string;

  @Field()
  @Column()
  creatorId: number;

  @Field()
  @Column({ default: true })
  privateRoom: boolean;

  @Field(() => User)
  @ManyToOne(() => User, user => user.rooms)
  creator: User;

  // @Field(() => User)
  // @OneToMany(() => User, user => user.member)
  // members: User[];

  @Field(() => RoomMember)
  @OneToMany(() => RoomMember, roomMember => roomMember.room)
  roomMembers: RoomMember[];

  @Field(() => Message)
  @OneToMany(() => Message, message => message.room)
  messages: Message[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt = new Date();

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt = new Date();
}

@ObjectType()
@Entity()
export class RoomMember extends BaseEntity {
  @Field()
  @PrimaryColumn()
  roomId: number;

  @Field()
  @ManyToOne(() => Room, room => room.roomMembers)
  room: Room;

  @Field()
  @Column()
  userId: number;

  @Field(() => User)
  @ManyToOne(() => User, user => user.roomAsMember)
  user: User;
}
