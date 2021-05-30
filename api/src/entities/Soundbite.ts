import { Max, Min } from "class-validator";
import { Field, Int, ObjectType } from "type-graphql";
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

@Entity()
@ObjectType()
export class Soundbite extends BaseEntity {
  @Field()
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
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;
}
