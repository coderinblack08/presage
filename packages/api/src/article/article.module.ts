import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "./article.entity";
import { ArticleResolver } from "./article.resolver";
import { ArticleService } from "./article.service";

@Module({
  imports: [TypeOrmModule.forFeature([Article])],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
