import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReactionsModule } from "src/reactions/reactions.module";
import { ArticlesController } from "./articles.controller";
import { Article } from "./articles.entity";
import { ArticlesService } from "./articles.service";

@Module({
  imports: [TypeOrmModule.forFeature([Article]), ReactionsModule],
  controllers: [ArticlesController],
  providers: [ArticlesService],
})
export class ArticlesModule {}
