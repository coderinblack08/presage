import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { getCols } from "src/utils";
import { Connection, getRepository, Repository } from "typeorm";
import { CreateRewardDto } from "./create-reward.dto";
import { Reward } from "./rewards.entity";

@Injectable()
export class RewardsService {
  constructor(
    @InjectRepository(Reward)
    private rewardsRepository: Repository<Reward>,
    @InjectConnection()
    private connection: Connection
  ) {}

  async create(userId: string, data: CreateRewardDto) {
    return this.rewardsRepository.create({ userId, ...data }).save();
  }

  async claim() {}

  async update(id: string, userId: string, data: Partial<Reward>) {
    return (
      await this.connection
        .createQueryBuilder()
        .update(Reward)
        .set(data)
        .where('id = :id and "userId" = :userId', { id, userId })
        .returning("*")
        .execute()
    ).raw[0];
  }

  async findAll(userId: string) {
    return this.rewardsRepository.find({
      where: { userId },
      select: getCols(getRepository(Reward)),
    });
  }

  async delete(id: string, userId: string) {
    await this.rewardsRepository.softDelete({ id, userId });
  }
}
