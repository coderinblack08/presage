import { Field, InputType } from "@nestjs/graphql";
import { IsHexColor, IsOptional, Length } from "class-validator";

@InputType()
export class CreateJournalArgs {
  @Field()
  @Length(1, 25)
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  @Length(5, 50)
  description?: string;

  @IsOptional()
  @Field({ nullable: true })
  @IsHexColor()
  color?: string;

  userId: string;
}
