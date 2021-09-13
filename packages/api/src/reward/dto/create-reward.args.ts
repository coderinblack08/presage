import { Field, InputType } from "@nestjs/graphql";
import {
  IsEnum,
  IsNumber,
  IsOptional,
  IsPositive,
  IsUrl,
  Length,
} from "class-validator";
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
  @IsPositive()
  points: number;

  @IsEnum(RewardType)
  @Field(() => RewardType)
  type: RewardType;

  @Field({ nullable: true })
  @IsPositive()
  @IsNumber()
  @IsOptional()
  maxShoutouts?: number;

  @Field({ nullable: true })
  @Length(5, 1000)
  @IsOptional()
  message?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  url?: string;
}
