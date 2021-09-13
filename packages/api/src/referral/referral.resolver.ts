import { HttpException, HttpStatus } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { CurrentUser } from "src/auth/user.param";
import { Referral } from "./referral.entity";
import { ReferralService } from "./referral.service";

@Resolver()
export class ReferralResolver {
  constructor(private readonly referralService: ReferralService) {}

  @Mutation(() => Referral)
  async createReferral(
    @Args("articleId") articleId: string,
    @CurrentUser() userId: string
  ) {
    try {
      return this.referralService.create(articleId, userId);
    } catch (error) {
      throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
