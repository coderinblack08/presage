import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { CurrentUser } from "src/users/users.param";
import { CreateRewardDto } from "./create-reward.dto";
import { RewardsService } from "./rewards.service";

@Controller("rewards")
export class RewardsController {
  constructor(private rewardsService: RewardsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@CurrentUser() userId: string, @Body() data: CreateRewardDto) {
    try {
      return this.rewardsService.create(userId, data);
    } catch (error) {
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() userId: string) {
    try {
      return this.rewardsService.findAll(userId);
    } catch (error) {
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
