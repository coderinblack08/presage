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

  @Field()
  @Column()
  description: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  thumbnail: string | null;

  @Field()
  @Column()
  audio: string;

  @Field(() => Int)
  @Column("int")
  length: number; // seconds, not minutes

  @ManyToOne(() => User, (user) => user.soundbites)
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;
}
