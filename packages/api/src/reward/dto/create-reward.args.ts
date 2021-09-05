import { Field, InputType } from "@nestjs/graphql";
import { IsEnum, IsNumber, Length, Min } from "class-validator";
import { RewardType } from "../reward.entity";

@InputType()
export class CreateRewardInput {
  @Field()
  @Length(1, 50)
  name: string;

  @Field()
  @Length(5, 200)
  description: string;

  @Field()
  @IsNumber()
  @Min(0)
  points: number;

  @IsEnum(RewardType)
  @Field(() => RewardType)
  type: RewardType;
}
