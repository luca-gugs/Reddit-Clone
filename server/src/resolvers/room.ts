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
import { Message } from '../entities/Message';
import { Room, RoomMember } from '../entities/Room';
import { isAuth } from '../middleware/isAuth';
import { MyContext } from '../types';

@InputType()
class RoomInput {
  @Field()
  title: string;
  @Field()
  privateRoom: boolean;
}

@ObjectType()
class SingleRoom {
  @Field()
  room: Room;
  @Field(() => [RoomMember])
  members: RoomMember[];
  @Field(() => [Message])
  messages: Message[];
}

@Resolver(Room)
export class RoomResolver {
  //Create Room
  @Mutation(() => Room)
  @UseMiddleware(isAuth)
  async createRoom(
    @Arg('input') input: RoomInput,
    @Ctx() { req }: MyContext
  ): Promise<boolean | Room> {
    let room = await Room.create({
      ...input,
      creatorId: req.session.userId,
    }).save();

    await RoomMember.create({
      roomId: room.id,
      userId: req.session.userId,
    }).save();

    return room;
  }

  //Subscription
  //   @Subscription()

  //Get Single Room (w/ messages & members)
  @Query(() => SingleRoom, { nullable: true })
  async room(@Arg('id', () => Int) id: number): Promise<any | undefined> {
    const room = await Room.findOne(id);
    const members = await getConnection().query(
      `
      SELECT a.*,
      json_build_object(
        'id', u.id, 
        'handle', u.handle
        ) creator

    FROM room_member a
    inner join public.user u on u.id = a."userId"
    where a."roomId" = $1
    ORDER BY "createdAt" ASC
    `,
      [id]
    );
    const messages = await getConnection().query(
      `
      SELECT a.*,
      json_build_object(
        'id', u.id, 
        'handle', u.handle
        ) creator

    FROM message a
    inner join public.user u on u.id = a."creatorId"
    where a."roomId" = $1
    ORDER BY "createdAt" ASC
    `,
      [id]
    );

    return { room: room, comments: members, messages: messages };
  }
}
