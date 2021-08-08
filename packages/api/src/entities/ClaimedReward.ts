import { IsIn } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Reward } from "./Reward";
import { User } from "./User";

type ClaimStatus = "pending" | "declined" | "successful" | "canceled";
const claimEnum = ["pending", "declined", "successful", "canceled"];

@Entity()
export class ClaimedReward extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @IsIn(claimEnum)
  @Column({
    type: "enum",
    enum: claimEnum,
    default: "pending",
  })
  status: ClaimStatus;

  @Column("text", { nullable: true })
  shoutoutArticle: string | null;

  @Column()
  rewardId: string;

  @Column()
  userId: string;

  @ManyToOne(() => Reward, (reward) => reward.claims)
  reward: Reward;

  @ManyToOne(() => User, (user) => user.claims, { onDelete: "CASCADE" })
  user: User;

  @CreateDateColumn()
  createdAt: Date;
}
