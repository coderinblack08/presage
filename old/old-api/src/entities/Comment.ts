import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity()
export class Comment extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  message: string;

  @ManyToOne(() => Article, (a) => a.comments, { onDelete: "CASCADE" })
  article: Article;

  @ManyToOne(() => User, (u) => u.likes, { onDelete: "CASCADE" })
  user: User;

  @Column("text", { array: true })
  path: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
