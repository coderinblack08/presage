import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/user.param";
import { CreateRewardInput } from "./dto/create-reward.args";
import { Reward } from "./reward.entity";
import { RewardService } from "./reward.service";

@Resolver()
export class RewardResolver {
  constructor(private rewardService: RewardService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Reward)
  async createReward(
    @CurrentUser() userId: string,
    @Args("data") data: CreateRewardInput
  ) {
    try {
      return this.rewardService.create(data, userId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
