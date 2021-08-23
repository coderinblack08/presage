import {
  HttpCode,
  HttpException,
  HttpStatus,
  Injectable,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "./article.entity";
import { UpdateArticleInput } from "./dto/update-article.args";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>
  ) {}

  async createBlank(userId: string, journalId: string) {
    return this.articleRepository
      .create({ title: "Untitled", journalId, userId })
      .save();
  }

  async findOne(id: string, userId: string) {
    const article = await this.articleRepository.findOne(id, {
      relations: ["journal"],
    });
    if (!article) {
      throw new HttpException("Article not found", HttpStatus.NOT_FOUND);
    }
    if (article.userId !== userId && !article?.isPublished) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
    return article;
  }

  async findDrafts(userId: string, journalId: string) {
    return this.articleRepository.find({ where: { userId, journalId } });
  }

  async update(id: string, userId: string, data: UpdateArticleInput) {
    return this.articleRepository
      .createQueryBuilder()
      .update(Article)
      .set(data)
      .where({ userId, id })
      .returning("*")
      .execute();
  }

  async delete(id: string) {
    return this.articleRepository.delete(id);
  }
}
