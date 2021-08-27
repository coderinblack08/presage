import { InputType } from "@nestjs/graphql";
import { IsEmail, IsOptional, IsUrl, Length } from "class-validator";

@InputType()
export class CreateApplicationInput {
  @IsEmail()
  email: string;

  @Length(10, 200)
  reason: string;

  @IsUrl()
  @IsOptional()
  twitter?: string;

  @IsUrl()
  @IsOptional()
  instagram?: string;

  @IsUrl()
  @IsOptional()
  linkedin?: string;

  @IsUrl()
  @IsOptional()
  medium?: string;

  @IsUrl()
  @IsOptional()
  substack?: string;

  @IsUrl()
  @IsOptional()
  website?: string;
}
