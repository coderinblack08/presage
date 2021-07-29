import { IsIn } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reward } from "./Reward";
import { User } from "./User";

type ClaimStatus = "pending" | "declined" | "successful";

@Entity()
export class ClaimedReward extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsIn(["pending", "declined", "successful"])
  @Column({
    type: "enum",
    enum: ["pending", "declined", "successful"],
    default: "pending",
  })
  status: ClaimStatus;

  @ManyToOne(() => Reward, (reward) => reward.claims, { onDelete: "CASCADE" })
  reward: Reward;

  @ManyToOne(() => User, (user) => user.claims, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
