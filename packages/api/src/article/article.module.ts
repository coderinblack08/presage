import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { FavoriteModule } from "src/favorite/favorite.module";
import { Article } from "./article.entity";
import { ArticleResolver } from "./article.resolver";
import { ArticleService } from "./article.service";

@Module({
  imports: [TypeOrmModule.forFeature([Article]), FavoriteModule],
  providers: [ArticleResolver, ArticleService],
})
export class ArticleModule {}
