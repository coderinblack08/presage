import { GraphQLJSONObject } from "graphql-type-json";
import { Field, ObjectType } from "@nestjs/graphql";
import { User } from "src/user/user.entity";
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
import { Journal } from "src/journal/journal.entity";

@Entity("articles")
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

  @Field(() => GraphQLJSONObject, { nullable: true })
  @Column("json", { nullable: true })
  // eslint-disable-next-line @typescript-eslint/ban-types
  editorJSON: JSON | null;

  @Field(() => String, { nullable: true })
  @Column("text", { nullable: true })
  html: string | null;

  @Field()
  @Column("bool", { default: false })
  isPublished: boolean;

  @Field()
  @Column()
  userId: string;

  @Field(() => User)
  @ManyToOne(() => User, { onDelete: "CASCADE" })
  user: User;

  @Field()
  @Column()
  journalId: string;

  @Field(() => Journal)
  @ManyToOne(() => Journal, (journal) => journal.articles, {
    onDelete: "CASCADE",
  })
  journal: Journal;

  @Field(() => [String])
  @Column("text", { array: true, default: [] })
  tags: string[];

  @Field(() => Date, { nullable: true })
  @Column("timestamp", { nullable: true })
  publishedAt: Date | null;

  @DeleteDateColumn()
  deletedAt: Date | null;

  @Field()
  @CreateDateColumn()
  createdAt: Date;

  @Field()
  @UpdateDateColumn()
  updatedAt: Date;
}
