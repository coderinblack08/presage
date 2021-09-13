import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindManyOptions, Repository } from "typeorm";
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
    @InjectRepository(Point)
    private readonly pointRepository: Repository<Point>
  ) {}

  stripData(reward: CreateRewardInput) {
    const data = { ...reward };
    if (data.message && data.type !== RewardType.Message) {
      delete data.message;
    }
    if (data.url && data.type !== RewardType.Link) {
      delete data.url;
    }
    if (data.maxShoutouts && data.type !== RewardType.Shoutout) {
      delete data.maxShoutouts;
    }
    return data;
  }

  async create(data: CreateRewardInput, userId: string) {
    data = this.stripData(data);
    return this.rewardRepository.create({ ...data, userId }).save();
  }

  async find(options: FindManyOptions<Reward>) {
    return this.rewardRepository.find(options);
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
