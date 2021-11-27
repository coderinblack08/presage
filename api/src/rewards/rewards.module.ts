import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { RewardsController } from "./rewards.controller";
import { Reward } from "./rewards.entity";
import { RewardsService } from "./rewards.service";

@Module({
  imports: [TypeOrmModule.forFeature([Reward])],
  controllers: [RewardsController],
  providers: [RewardsService],
})
export class RewardsModule {}
