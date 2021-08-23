import { Field, InputType } from "@nestjs/graphql";
import { IsObject, IsUrl, Length } from "class-validator";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class CreateArticleInput {
  @Field(() => String)
  @Length(1, 100)
  title: string;

  @Field(() => String)
  @Length(5, 100)
  description: string;

  @Field(() => [String])
  tags: string[];

  @IsObject()
  @Field(() => GraphQLJSONObject)
  editorJSON: JSON;

  @Field(() => String)
  @IsUrl()
  canonical: string;
}
