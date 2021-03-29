import { MyContext } from 'src/types';
import {
  Arg,
  Ctx,
  Field,
  InputType,
  Int,
  Mutation,
  PubSub,
  PubSubEngine,
  Resolver,
  Root,
  Subscription,
  UseMiddleware,
} from 'type-graphql';
import { Message } from '../entities/Message';
import { isAuth } from '../middleware/isAuth';

@InputType()
class MessageInput {
  @Field()
  text!: string;
  @Field(() => Int)
  roomId!: number;
}

@Resolver()
export class MessageResolver {
  //Within a Resolver we can either do querys or mutations
  //In GraphQL we define what our query returns
  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async addMessage(
    @PubSub() pubSub: PubSubEngine,
    @Arg('input') input: MessageInput,
    @Ctx() { req }: MyContext
  ): Promise<MessageInput | Error | Boolean> {
    //     await getConnection().transaction(async tm => {
    //       await tm.query(
    //         `
    //   insert into message ("text", "roomId", "creatorId")
    //   values ($1, $2, $3)
    //       `,
    //         [input.text, input.roomId, req.session.userId]
    //       );
    //     });
    let test = await Message.create({
      text: input.text,
      roomId: input.roomId,
      creatorId: req.session.userId,
    }).save();

    console.log('TEST: ', test);

    await pubSub.publish('CHANNEL', test);

    return true;
  }

  @Subscription({ topics: 'CHANNEL' })
  messageSent(
    @Root()
    {
      text,
      roomId,
      creatorId,
      room,
      creator,
      hasId,
      createdAt,
      save,
      remove,
      softRemove,
      recover,
      reload,
    }: Message
  ): Message {
    return {
      text,
      roomId,
      creatorId,
      room,
      creator,
      hasId,
      createdAt,
      save,
      remove,
      softRemove,
      recover,
      reload,
    };
  }
}
