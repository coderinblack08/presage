import { Ctx, FieldResolver, Query, Resolver, Root } from "type-graphql";
import { User } from "../../entities/User";
import { createBaseResolver } from "../../lib/createBaseResolver";
import { Context } from "../../types/Context";

@Resolver(() => User)
export class UserResolver extends createBaseResolver("User", User) {
  @FieldResolver()
  email(@Root() user: User, @Ctx() { req }: Context) {
    if (req.user?.id === user.id) {
      return user.email;
    }
    return null;
  }

  @Query(() => User)
  async me(@Ctx() { req }: Context) {
    return req.user;
  }
}
