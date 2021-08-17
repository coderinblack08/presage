import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Journal } from "./journal.entity";
import { JournalResolver } from "./journal.resolver";
import { JournalService } from "./journal.service";

@Module({
  imports: [TypeOrmModule.forFeature([Journal])],
  providers: [JournalResolver, JournalService],
  exports: [JournalService],
})
export class JournalModule {}
