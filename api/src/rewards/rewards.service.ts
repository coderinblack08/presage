import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateRewardDto } from "./create-reward.dto";
import { Reward } from "./rewards.entity";

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>
  ) {}

  async create(userId: string, data: CreateRewardDto) {
    return this.rewardsRepository.create({ userId, ...data }).save();
  }

  async findAll(userId: string) {
    return this.rewardsRepository.find({ where: { userId } });
  }
}
