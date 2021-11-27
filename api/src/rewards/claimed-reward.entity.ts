import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

export enum ClaimedRewardStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

@Entity()
export class ClaimedReward extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  purchasedPrice: number;

  @Column()
  userId: string;

  @Column()
  status: ClaimedRewardStatus;

  @Column()
  rewardId: string;

  @CreateDateColumn()
  createdAt: Date;
}
