import { Module } from "@nestjs/common";
import { JournalsService } from './journals.service';
import { JournalsController } from './journals.controller';

@Module({
  providers: [JournalsService],
  controllers: [JournalsController]
})
export class JournalsModule {}
