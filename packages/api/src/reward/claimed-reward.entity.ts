import { User } from "src/user/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reward } from "./reward.entity";

export enum ClaimedStatus {
  Pending = "Pending",
  Successful = "Successful",
  Canceled = "Canceled",
}

@Entity("claimed_rewards")
export class ClaimedReward extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  rewardId: string;

  @ManyToOne(() => User)
  recipient: User;

  @ManyToOne(() => Reward)
  reward: Reward;

  @Column({ type: "enum", enum: ClaimedStatus, default: ClaimedStatus.Pending })
  status: ClaimedStatus;

  @CreateDateColumn()
  createdAt: Date;
}
