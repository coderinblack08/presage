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
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
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
  @Column("text", { nullable: true })
  link: string | null;

  @IsIn(["shoutout", "link", "other"])
  @Column({ type: "enum", enum: ["shoutout", "link", "other"] })
  type: RewardType;

  @IsInt()
  @Min(0)
  @Max(1000)
  @Column("int")
  points: number;

  @ManyToOne(() => User, (user) => user.rewards)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
