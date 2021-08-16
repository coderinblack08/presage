import { Field, ID, ObjectType } from "@nestjs/graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";

@ObjectType()
@Entity("users")
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true, select: false })
  email: string | null;

  @Field()
  @Column()
  displayName: string;

  @Field()
  @Column({ unique: true })
  username: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  bio: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  profilePicture: string | null;

  @Column("text", { select: false, nullable: true })
  googleId: string | null;

  @Field(() => Date)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => Date)
  @UpdateDateColumn()
  updatedAt: Date;
}
