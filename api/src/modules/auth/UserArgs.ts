import { IsEmail, IsOptional, Length } from "class-validator";
import { Field, InputType } from "type-graphql";

@InputType()
export class UserArgs {
  @IsEmail()
  @IsOptional()
  @Field(() => String, { nullable: true })
  email?: string;

  @IsOptional()
  @Length(2, 50)
  @Field(() => String, { nullable: true })
  username?: string;

  @IsOptional()
  @Length(2, 50)
  @Field(() => String, { nullable: true })
  displayName?: string;
}
