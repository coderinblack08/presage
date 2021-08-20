import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Article } from "src/article/article.entity";
import { Journal } from "./journal.entity";
import { JournalResolver } from "./journal.resolver";
import { JournalService } from "./journal.service";

@Module({
  imports: [TypeOrmModule.forFeature([Journal, Article])],
  providers: [JournalResolver, JournalService],
  exports: [JournalService],
})
export class JournalModule {}
