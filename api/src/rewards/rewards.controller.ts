import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Param,
  Patch,
  Post,
  Put,
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
      throw new InternalServerErrorException();
    }
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findAll(@CurrentUser() userId: string) {
    try {
      return this.rewardsService.findAll(userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Put(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @CurrentUser() userId: string,
    @Body() data: Partial<CreateRewardDto>,
    @Param("id") id: string
  ) {
    try {
      return this.rewardsService.update(id, userId, data);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }

  @Delete(":id")
  @UseGuards(JwtAuthGuard)
  async delete(@CurrentUser() userId: string, @Param("id") id: string) {
    try {
      return this.rewardsService.delete(id, userId);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
