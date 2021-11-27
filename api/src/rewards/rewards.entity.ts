import { User } from "src/users/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum RewardType {
  SHOUTOUT = "shoutout",
  MESSAGE = "message",
}

@Entity()
export class Reward extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("enum", { enum: RewardType })
  type: RewardType;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ default: 0 })
  cost: number;

  @Column({ nullable: true })
  maxShoutouts?: number;

  @Column({ nullable: true, select: false })
  message?: string;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.rewards)
  user: User;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;
}
