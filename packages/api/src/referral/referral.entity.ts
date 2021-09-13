import { Field, ObjectType } from "@nestjs/graphql";
import { Article } from "src/article/article.entity";
import { User } from "src/user/user.entity";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
} from "typeorm";

@Entity("referral")
@ObjectType()
export class Referral extends BaseEntity {
  @Field()
  @PrimaryColumn()
  userId: string;

  @Field()
  @PrimaryColumn()
  articleId: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Article)
  article: Article;

  @Field()
  @Column()
  code: string;

  @Field()
  @Column({ default: 0 })
  shareCount: number;

  @Field()
  @CreateDateColumn()
  createdAt: Date;
}
