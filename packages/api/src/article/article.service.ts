import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Article } from "./article.entity";
import { UpdateArticleInput } from "./dto/update-article.args";

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article) private articleRepository: Repository<Article>
  ) {}

  async createBlank(userId: string) {
    return this.articleRepository.create({ title: "Untitled", userId }).save();
  }

  async update(id: string, data: UpdateArticleInput) {
    return this.articleRepository.update(id, data);
  }

  async delete(id: string) {
    return this.articleRepository.delete(id);
  }
}
