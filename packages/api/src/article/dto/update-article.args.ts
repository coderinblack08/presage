import { Field, InputType } from "@nestjs/graphql";
import { IsObject, IsOptional, IsUrl, Length } from "class-validator";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class UpdateArticleInput {
  @Field()
  @IsOptional()
  @Length(1, 100)
  title?: string;

  @IsOptional()
  @IsObject()
  @Field(() => GraphQLJSONObject)
  editorJSON?: JSON;

  @Field()
  @IsOptional()
  @IsUrl()
  canonical?: string;

  @Field()
  @IsOptional()
  @Length(5, 100)
  description?: string;
}
