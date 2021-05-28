import { ApolloError } from "apollo-server-errors";
import {
  Arg,
  Ctx,
  FieldResolver,
  Mutation,
  Query,
  Resolver,
  Root,
} from "type-graphql";
import { getConnection } from "typeorm";
import { User } from "../../entities/User";
import { createBaseResolver } from "../../lib/createBaseResolver";
import { Context } from "../../types/Context";
import { UserArgs } from "./UserArgs";

const PG_UNIQUE_CONSTRAINT_VIOLATION = "23505";

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

  @Mutation(() => User)
  async updateUser(
    @Arg("data", () => UserArgs) data: UserArgs,
    @Ctx() { req }: Context
  ): Promise<User | void> {
    try {
      const user = await getConnection()
        .createQueryBuilder()
        .update(User)
        .set(data)
        .where("id = :id", { id: req.user.id })
        .returning("*")
        .execute();
      return user.raw[0];
    } catch (error) {
      if (error && error.code === PG_UNIQUE_CONSTRAINT_VIOLATION) {
        // @todo: test if this even works
        throw new ApolloError("Username is already taken");
      }
    }
  }
}
