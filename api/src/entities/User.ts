import { Field, ID, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Soundbite } from "./Soundbite";

@Entity()
@ObjectType()
export class User extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  profilePicture: string | null;

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

  @OneToMany(() => Soundbite, (soundbite) => soundbite.user)
  soundbites: Soundbite[];

  @Field()
  @CreateDateColumn()
  createdAt: string;

  @Field()
  @UpdateDateColumn()
  updatedAt: string;
}
