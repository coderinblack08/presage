import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, Repository } from "typeorm";
import { ClaimedReward, ClaimedStatus } from "./claimed-reward.entity";
import { CreateRewardInput } from "./dto/create-reward.args";
import { Point } from "./points.entity";
import { Reward, RewardType } from "./reward.entity";

@Injectable()
export class RewardService {
  constructor(
    @InjectRepository(Reward)
    private readonly rewardRepository: Repository<Reward>,
    @InjectRepository(ClaimedReward)
    private readonly claimedRewardRepository: Repository<ClaimedReward>,
    @InjectRepository(ClaimedReward)
    private readonly pointRepository: Repository<Point>
  ) {}

  async create(data: CreateRewardInput) {
    return this.rewardRepository.create(data).save();
  }

  async claim(id: string, userId: string) {
    const body: DeepPartial<ClaimedReward> = { userId, rewardId: id };
    const reward = await this.rewardRepository.findOne(id);
    const userPoints = await this.pointRepository.findOne({
      where: { readerId: userId, writerId: reward?.userId },
    });
    if (!reward) {
      throw new Error("Reward not found");
    }
    if (reward.userId === userId) {
      throw new Error("You cannot claim your own reward");
    }
    if (reward.type === RewardType.Message || reward.type === RewardType.Link) {
      body.status = ClaimedStatus.Successful;
    }
    if (!userPoints || reward.points > userPoints?.points) {
      throw new Error("You don't have enough points");
    }
    userPoints.points -= reward.points;
    await userPoints.save();
    return this.claimedRewardRepository.create(body).save();
  }
}
