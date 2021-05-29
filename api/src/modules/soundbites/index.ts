import { createWriteStream } from "fs";
import { FileUpload, GraphQLUpload } from "graphql-upload";
import { Arg, Ctx, Mutation, Resolver } from "type-graphql";
import { v4 } from "uuid";
import { getAudioDurationInSeconds } from "get-audio-duration";
import { __prod__ } from "../../constants";
import { Soundbite } from "../../entities/Soundbite";
import { createBaseResolver } from "../../lib/createBaseResolver";
import { SoundbiteArgs } from "./SoundbiteArgs";
import { Context } from "../../types/Context";

@Resolver()
export class SoundbiteResolver extends createBaseResolver(
  "Soundbite",
  Soundbite
) {
  @Mutation(() => Soundbite)
  async createSoundbite(
    @Arg("data", () => SoundbiteArgs) data: SoundbiteArgs,
    @Arg("audio", () => GraphQLUpload) audio: FileUpload,
    @Ctx() { req }: Context
  ) {
    const audioPath = `${audio.filename}-${v4()}`;
    if (!__prod__) {
      await new Promise((resolve, reject) =>
        audio
          .createReadStream()
          .pipe(createWriteStream(`${__dirname}/../../../uploads/${audioPath}`))
          .on("finish", () => resolve(true))
          .on("error", () => reject(false))
      );
    }
    const length = await getAudioDurationInSeconds(audio.createReadStream());
    const soundbite = await Soundbite.create({
      ...data,
      length,
      user: req.user,
      audio: `http://localhost:4000/uploads/${audioPath}`,
    }).save();

    return soundbite;
  }
}
