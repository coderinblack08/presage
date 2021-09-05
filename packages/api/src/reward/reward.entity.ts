import { Field, ObjectType, registerEnumType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

export enum RewardType {
  Form = "Form",
  Shoutout = "Shoutout",
  Message = "Message",
  Link = "Link",
}

registerEnumType(RewardType, { name: "RewardType" });

@Entity("rewards")
@ObjectType()
export class Reward extends BaseEntity {
  @PrimaryGeneratedColumn()
  @Field()
  id: string;

  @Field()
  @Column()
  name: string;

  @Field()
  @Column()
  description: string;

  @Field()
  @Column()
  points: number;

  @Field()
  @Column({ default: 0 })
  claimCount: number;

  @Field(() => RewardType)
  @Column({ type: "enum", enum: RewardType })
  type: RewardType;

  @Column()
  userId: string;

  @ManyToOne(() => User, (user) => user.rewards)
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
