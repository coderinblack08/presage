import { Field, InputType, PartialType } from "@nestjs/graphql";
import { IsObject, IsUrl, Length } from "class-validator";
import { GraphQLJSONObject } from "graphql-type-json";

@InputType()
export class BaseArticleInput {
  @Field(() => String, { nullable: true })
  @Length(1, 100)
  title: string;

  @Field(() => String, { nullable: true })
  @Length(5, 100)
  description: string;

  @IsObject()
  @Field(() => GraphQLJSONObject, { nullable: true })
  editorJSON: JSON;

  @Field(() => String, { nullable: true })
  @IsUrl()
  canonical: string;
}

@InputType()
export class UpdateArticleInput extends PartialType(BaseArticleInput) {}
