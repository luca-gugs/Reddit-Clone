import { Query, Resolver } from 'type-graphql';

//In type
@Resolver()
export class HelloResolver {
  //Within a Resolver we can either do querys or mutations
  //In GraphQL we define what our query returns
  @Query(() => String)
  hello() {
    return 'hello world';
  }
}
