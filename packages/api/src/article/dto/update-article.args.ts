import { InputType, PartialType } from "@nestjs/graphql";
import { CreateArticleInput } from "./create-article.args";

@InputType()
export class UpdateArticleInput extends PartialType(CreateArticleInput) {}
