import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  email: string | null;

  @Field(() => String, { nullable: true })
  @Column("text", { unique: true, nullable: true })
  username: string | null;

  @Column()
  googleId: string;

  @Field()
  @Column()
  displayName: string;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
