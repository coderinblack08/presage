import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity()
export class Shoutout extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  userId: string;

  @Column()
  articleId: string;

  @ManyToOne(() => User, (u) => u.shoutouts, {
    onDelete: "CASCADE",
    eager: true,
  })
  user: User;

  @ManyToOne(() => Article, (a) => a.shoutouts, { onDelete: "CASCADE" })
  article: Article;
}
