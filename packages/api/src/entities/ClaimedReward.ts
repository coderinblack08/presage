import {
  BaseEntity,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reward } from "./Reward";
import { User } from "./User";

@Entity()
export class ClaimedReward extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne(() => Reward, (reward) => reward.claims)
  reward: Reward;

  @ManyToOne(() => User, (user) => user.claims)
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
