import { Field, InputType } from "@nestjs/graphql";
import { IsOptional, Length, Matches } from "class-validator";

@InputType()
export class CreateJournalArgs {
  @Field()
  @Length(1, 25)
  name: string;

  @IsOptional()
  @Field({ nullable: true })
  @Length(5, 100)
  description?: string;

  @IsOptional()
  @Field({ nullable: true })
  @Matches(
    /^(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])$/
  )
  emoji?: string;

  userId: string;
}
