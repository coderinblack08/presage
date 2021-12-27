import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { ReactionsService } from "src/reactions/reactions.service";
import { Connection, Repository } from "typeorm";
import { Article } from "./articles.entity";
import { UpdateArticleDto } from "./update-article.dto";

@Injectable()
export class ArticlesService {
  constructor(
    @InjectRepository(Article)
    private articlesRepository: Repository<Article>,
    @InjectConnection() private connection: Connection,
    private reactionsService: ReactionsService
  ) {}

  async create(userId: string) {
    return this.articlesRepository
      .create({ title: "Untitled", tags: [], userId })
      .save();
  }

  async findDrafts(userId: string) {
    return this.articlesRepository.find({
      where: { userId },
      order: { updatedAt: "DESC" },
    });
  }

  async findOne(id: string, userId: string) {
    const article = await this.articlesRepository.findOne({
      where: { id },
      relations: ["user"],
    });
    if (article.userId !== userId && !article.isPublished) {
      throw new Error("Not Authorized");
    }
    if (article.isPublished) {
    }
    return article;
  }

  async update(id: string, userId: string, data: UpdateArticleDto) {
    return this.connection
      .createQueryBuilder()
      .update(Article)
      .set(data)
      .where({ id, userId })
      .returning("*")
      .execute();
  }

  async publish(id: string, userId: string) {
    const result = await this.connection
      .createQueryBuilder()
      .update(Article)
      .set({ isPublished: () => 'not article."isPublished"' } as any)
      .where('article.id = :id and article."userId" = :userId', { id, userId })
      .returning("*")
      .execute();
    if (result.raw[0].isPublished === true) {
      await this.articlesRepository.update(
        { id, userId },
        { publishedAt: () => "CURRENT_TIMESTAMP" }
      );
    }
  }

  async delete(id: string, userId: string) {
    return this.articlesRepository.delete({ id, userId });
  }
}
