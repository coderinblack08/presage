import { GraphQLJSONObject } from "graphql-type-json";
import { Field, ObjectType } from "@nestjs/graphql";
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

@Entity()
@ObjectType()
export class Article extends BaseEntity {
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
  canonical: string | null;

  @Field(() => GraphQLJSONObject)
  @Column("json", { nullable: true })
  // eslint-disable-next-line @typescript-eslint/ban-types
  editorJSON: JSON | null;

  @Column("text", { nullable: true })
  html: string;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
