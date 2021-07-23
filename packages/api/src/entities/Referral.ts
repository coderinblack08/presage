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
  jwt: string;

  @Column()
  token: string;

  @PrimaryColumn()
  articleId: string;

  @ManyToOne(() => Article, (article) => article.referrals)
  article: Article;

  @PrimaryColumn()
  referrerId: string;

  @ManyToOne(() => User, (user) => user.referrals)
  referrer: User;

  @Column("int", { default: 0 })
  count: number;

  @Column("bool", { default: false })
  claimed: boolean;

  @CreateDateColumn()
  createdAt: Date;
}
