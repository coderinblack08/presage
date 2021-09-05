import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ClaimedReward } from "./claimed-reward.entity";
import { Point } from "./points.entity";
import { Reward } from "./reward.entity";
import { RewardResolver } from "./reward.resolver";
import { RewardService } from "./reward.service";

@Module({
  imports: [TypeOrmModule.forFeature([Reward, ClaimedReward, Point])],
  providers: [RewardResolver, RewardService],
})
export class RewardModule {}
