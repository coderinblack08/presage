import { IsEnum } from "class-validator";
import { ReactionType } from "./reactions.entity";

export class CreateReactionDto {
  @IsEnum(ReactionType)
  type: ReactionType;
}
