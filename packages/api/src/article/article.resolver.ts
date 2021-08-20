import {
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/user.param";
import { Article } from "./article.entity";
import { ArticleService } from "./article.service";

@Resolver()
export class ArticleResolver {
  constructor(private articleService: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Article)
  async createArticle(
    @CurrentUser() userId: string,
    @Args("journalId", ParseUUIDPipe) journalId: string
  ) {
    try {
      const article = await this.articleService.createBlank(userId, journalId);
      return article;
    } catch (error) {
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => [Article])
  async findDrafts(
    @CurrentUser() userId: string,
    @Args("journalId", ParseUUIDPipe) journalId: string
  ) {
    try {
      const articles = await this.articleService.findDrafts(userId, journalId);
      return articles;
    } catch (error) {
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Query(() => Article, { nullable: true })
  async findArticle(
    @CurrentUser() userId: string,
    @Args("id", ParseUUIDPipe) id: string
  ) {
    try {
      return this.articleService.findOne(id, userId);
    } catch (error) {
      throw error;
    }
  }
}
