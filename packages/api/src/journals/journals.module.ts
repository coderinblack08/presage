import { Module } from "@nestjs/common";
import { JournalsService } from "./journals.service";
import { JournalsController } from "./journals.controller";
import { PrismaService } from "src/prisma.service";

@Module({
  providers: [JournalsService, PrismaService],
  controllers: [JournalsController],
})
export class JournalsModule {}
