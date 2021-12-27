import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ReactionsController } from "./reactions.controller";
import { Reaction } from "./reactions.entity";
import { ReactionsService } from "./reactions.service";

@Module({
  imports: [TypeOrmModule.forFeature([Reaction])],
  providers: [ReactionsService],
  exports: [ReactionsService],
  controllers: [ReactionsController],
})
export class ReactionsModule {}
