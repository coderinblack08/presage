import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { Soundbite } from "../../entities/Soundbite";
import { createBaseResolver } from "../../lib/createBaseResolver";
import { Context } from "../../types/Context";
import { SoundbiteArgs } from "./SoundbiteArgs";
import { uploadFile } from "./uploadFile";

@Resolver()
export class SoundbiteResolver extends createBaseResolver(
  "Soundbite",
  Soundbite,
  { relations: ["user"] }
) {
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
      thumbnail: `http://localhost:4000/uploads/${thumbnailPath}`,
    }).save();

    return soundbite;
  }
}
