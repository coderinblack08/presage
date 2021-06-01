import { FileUpload, GraphQLUpload } from "graphql-upload";
import {
  Arg,
  Ctx,
  FieldResolver,
  Int,
  Mutation,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Soundbite } from "../../entities/Soundbite";
import { Upvote } from "../../entities/Upvote";
import { createBaseResolver } from "../../lib/createBaseResolver";
import { isAuth } from "../../middleware/isAuth";
import { Context } from "../../types/Context";
import { SoundbiteArgs } from "./SoundbiteArgs";
import { uploadFile } from "./uploadFile";

@Resolver(() => Soundbite)
export class SoundbiteResolver extends createBaseResolver(
  "Soundbite",
  Soundbite,
  { relations: ["user"] }
) {
  @FieldResolver(() => Int, { nullable: true })
  async voteStatus(
    @Root() { id }: Soundbite,
    @Ctx() { req, upvoteLoader }: Context
  ) {
    if (!req.user) return null;
    const upvote = await upvoteLoader.load({
      soundbiteId: id,
      userId: req.user.id,
    });
    return upvote ? upvote.value : null;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Soundbite)
  async createSoundbite(
    @Arg("data", () => SoundbiteArgs) data: SoundbiteArgs,
    @Arg("audio", () => GraphQLUpload) audio: FileUpload,
    @Arg("thumbnail", () => GraphQLUpload, { nullable: true })
    thumbnail: FileUpload | null,
    @Ctx() { req }: Context
  ) {
    const audioPath = await uploadFile(audio);
    const thumbnailPath = thumbnail ? await uploadFile(thumbnail) : null;

    const soundbite = await Soundbite.create({
      ...data,
      user: req.user,
      audio: `http://localhost:4000/uploads/${audioPath}`,
      thumbnail: thumbnail
        ? `http://localhost:4000/uploads/${thumbnailPath}`
        : null,
    }).save();

    return soundbite;
  }

  @UseMiddleware(isAuth)
  @Mutation(() => Boolean)
  async vote(
    @Arg("soundbiteId") soundbiteId: string,
    @Arg("value", () => Int) value: number,
    @Ctx() { req }: Context
  ) {
    const isUpvote = value !== -1;
    const realValue = isUpvote ? 1 : -1;
    const userId = req.user.id;
    const conn = getConnection();

    const upvote = await Upvote.findOne({ where: { soundbiteId, userId } });
    if (upvote && upvote.value !== realValue) {
      await conn.transaction(async (tm) => {
        await tm.query(
          `
          update upvote
          set value = $1
          where "soundbiteId" = $2 and "userId" = $3;
        `,
          [realValue, soundbiteId, userId]
        );
        await tm.query(
          `
          update soundbite
          set points = points + $1
          where id = $2;
        `,
          [2 * realValue, soundbiteId]
        );
      });
    } else if (!upvote) {
      await conn.transaction(async (tm) => {
        await tm.query(
          `
          insert into upvote ("userId", "soundbiteId", value)
          values ($1, $2, $3);
        `,
          [userId, soundbiteId, realValue]
        );
        await tm.query(
          `
          update soundbite
          set points = points + $1
          where id = $2;
        `,
          [realValue, soundbiteId]
        );
      });
    }
    return true;
  }
}
