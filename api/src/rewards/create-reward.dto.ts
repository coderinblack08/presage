import { IsEnum, IsOptional, MaxLength, Min } from "class-validator";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";
import { RewardType } from "./rewards.entity";

export class CreateRewardDto {
  @IsEnum(RewardType)
  type: RewardType;

  @MaxLength(128)
  name: string;

  @MaxLength(1024)
  description: string;

  @MaxLength(8192)
  @IsOptional()
  message?: string;

  @Min(0)
  cost: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
