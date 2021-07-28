import {
  IsIn,
  IsInt,
  IsOptional,
  IsUrl,
  Length,
  Max,
  Min,
} from "class-validator";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { ClaimedReward } from "./ClaimedReward";
import { User } from "./User";

export type RewardType = "shoutout" | "link" | "other";

@Entity()
export class Reward extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Length(5, 20)
  @Column()
  name: string;

  @Length(10, 100)
  @Column()
  description: string;

  @IsOptional()
  @IsUrl()
  @Column("text", { nullable: true, select: false })
  link: string | null;

  @IsIn(["shoutout", "link", "other"])
  @Column({ type: "enum", enum: ["shoutout", "link", "other"] })
  type: RewardType;

  @IsInt()
  @Min(0)
  @Max(1000)
  @Column("int")
  points: number;

  @Column("int", { default: 0 })
  claimed: number;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.rewards, { onDelete: "CASCADE" })
  user: User;

  @OneToMany(() => ClaimedReward, (cr) => cr.reward)
  claims: ClaimedReward[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
