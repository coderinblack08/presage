import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsUrl, Length } from "class-validator";

@InputType()
export class CreateApplicationInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @Length(10, 200)
  reason: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  twitter?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  instagram?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  medium?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  substack?: string;

  @Field({ nullable: true })
  @IsUrl()
  @IsOptional()
  website?: string;
}
