import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity()
export class Referral extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  token: string;

  @PrimaryColumn()
  articleId: string;

  @ManyToOne(() => Article, (article) => article.referrals, {
    onDelete: "CASCADE",
  })
  article: Article;

  @PrimaryColumn()
  referrerId: string;

  @ManyToOne(() => User, (user) => user.referrals, { onDelete: "CASCADE" })
  referrer: User;

  @Column("int", { default: 0 })
  claimCount: number;

  @CreateDateColumn()
  createdAt: Date;
}
