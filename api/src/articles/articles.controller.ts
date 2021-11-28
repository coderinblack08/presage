import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { Public } from "src/users/users.decorator";
import { CurrentUser } from "src/users/users.param";
import { ArticlesService } from "./articles.service";
import { UpdateArticleDto } from "./update-article.dto";

@Controller("articles")
export class ArticlesController {
  constructor(private articlesService: ArticlesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@CurrentUser() userId: string) {
    try {
      return this.articlesService.create(userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Get("drafts")
  @UseGuards(JwtAuthGuard)
  async findDrafts(@CurrentUser() userId: string) {
    try {
      return this.articlesService.findDrafts(userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Public()
  @Get(":id")
  @UseGuards(JwtAuthGuard)
  async findOne(@CurrentUser() userId: string, @Param("id") id: string) {
    try {
      return this.articlesService.findOne(id, userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @CurrentUser() userId: string,
    @Param("id") id: string,
    @Body() data: Partial<UpdateArticleDto>
  ) {
    try {
      const article = await this.articlesService.update(id, userId, data);
      return article.raw[0];
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Post(":id/publish")
  @UseGuards(JwtAuthGuard)
  async publish(@CurrentUser() userId: string, @Param("id") id: string) {
    try {
      await this.articlesService.publish(id, userId);
      return true;
    } catch (error) {
      console.log(error);

      throw new InternalServerErrorException();
    }
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@CurrentUser() userId: string, @Param("id") id: string) {
    try {
      await this.articlesService.delete(id, userId);
      return true;
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
