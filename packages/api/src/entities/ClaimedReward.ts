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

  @ManyToOne(() => Reward, (reward) => reward.claims, { onDelete: "CASCADE" })
  reward: Reward;

  @ManyToOne(() => User, (user) => user.claims, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
