import { Max, Min } from "class-validator";
import { Field, ID, Int, ObjectType } from "type-graphql";
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
import { Upvote } from "./Upvote";
import { User } from "./User";

@Entity()
@ObjectType()
export class Soundbite extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field()
  @Column()
  title: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  description: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  thumbnail: string | null;

  @Field()
  @Column()
  audio: string;

  @Min(0)
  @Max(60 * 5)
  @Field(() => Int)
  @Column("int")
  length: number; // seconds, not minutes

  @Field(() => User)
  @ManyToOne(() => User, (user) => user.soundbites)
  user: User;

  @Field()
  @Column({ default: 0 })
  points: number;

  @Field(() => Int, { nullable: true })
  voteStatus: number | null;

  @OneToMany(() => Upvote, (upvote) => upvote.soundbite)
  upvotes: Upvote[];

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;
}
