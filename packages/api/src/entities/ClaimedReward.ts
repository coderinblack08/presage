import { IsIn } from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { DirectMessage } from "./DirectMessage";
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

  @Column("text", { nullable: true })
  shoutoutArticle: string | null;

  @Column()
  rewardId: string;

  @Column()
  userId: string;

  @ManyToOne(() => Reward, (reward) => reward.claims, { onDelete: "CASCADE" })
  reward: Reward;

  @ManyToOne(() => User, (user) => user.claims, { onDelete: "CASCADE" })
  user: User;

  @OneToOne(() => DirectMessage, (dm) => dm.claimedReward)
  directMessage: DirectMessage;

  @CreateDateColumn()
  createdAt: Date;
}
