import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import axios from "axios";
import { FavoriteService } from "src/favorite/favorite.service";
import { Repository } from "typeorm";
import { Article } from "./article.entity";
import { UpdateArticleInput } from "./dto/update-article.args";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>,
    private configService: ConfigService,
    private favoriteService: FavoriteService
  ) {}

  async createBlank(userId: string, journalId: string) {
    return this.articleRepository
      .create({ title: "Untitled", journalId, userId })
      .save();
  }

  async findOne(id: string, userId: string, relations = true) {
    const article = await this.articleRepository.findOne(id, {
      relations: relations ? ["journal", "user"] : [],
    });
    const isFavored = await this.favoriteService.isFavored(id, userId);
    if (!article) {
      throw new HttpException("Article not found", HttpStatus.NOT_FOUND);
    }
    if (article.userId !== userId && !article?.isPublished) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return { ...article, isFavored };
  }

  async findDrafts(userId: string, journalId: string) {
    return this.articleRepository.find({ where: { userId, journalId } });
  }

  async update(id: string, userId: string, data: UpdateArticleInput) {
    const body: Record<string, any> = { ...data };
    if (body.editorJSON) {
      body.html = await this.generateHTML(body.editorJSON);
    }
    return this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set(body)
      .where({ userId, id })
      .returning("*")
      .execute();
  }

  async delete(id: string, userId: string) {
    return this.articleRepository.delete({ id, userId });
  }

  async publish(id: string, userId: string) {
    return this.articleRepository.update({ id, userId }, { isPublished: true });
  }

  async unPublish(id: string, userId: string) {
    return this.articleRepository.update(
      { id, userId },
      { isPublished: false }
    );
  }

  async generateHTML(editorJSON: any) {
    const { data } = await axios.post(
      `${this.configService.get("client")}/api/generate-html`,
      { editorJSON }
    );
    return data;
  }
}
