import { ArgsType, Field } from "@nestjs/graphql";
import { IsHexColor, IsOptional, Length } from "class-validator";

@ArgsType()
export class CreateJournalArgs {
  @Field()
  @Length(1, 25)
  name: string;

  @Field({ nullable: true })
  @IsOptional()
  @Length(5, 50)
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsHexColor()
  color?: string;

  userId: string;
}
