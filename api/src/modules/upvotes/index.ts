import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { getConnection } from "typeorm";
import { Context } from "vm";
import { Soundbite } from "../../entities/Soundbite";
import { Upvote } from "../../entities/Upvote";

@Resolver()
export class UpvoteResolver {
  @Mutation(() => Boolean)
  async deleteUpvote(
    @Arg("soundbiteId") soundbiteId: string,
    @Ctx() { req }: Context
  ) {
    await Upvote.delete({ soundbiteId, userId: req.user.id });
    await getConnection().manager.decrement(
      Soundbite,
      { id: soundbiteId },
      "upvoteCount",
      1
    );
    return true;
  }

  @Mutation(() => Boolean)
  async createUpvote(
    @Arg("soundbiteId") soundbiteId: string,
    @Ctx() { req }: Context
  ) {
    try {
      const connection = getConnection();
      await connection.query(
        `
        insert into public.upvote("soundbiteId", "userId")
        values ($1, $2)
        returning *;
      `,
        [soundbiteId, req.user.id]
      );
      await connection.manager.increment(
        Soundbite,
        { id: soundbiteId },
        "upvoteCount",
        1
      );
      return true;
    } catch (error) {
      return false;
    }
  }
}
