import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Article } from "./Article";

@Entity()
export class Tag extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", { unique: true })
  name: string;

  @Column("int", { default: 0 })
  usedBy: number;

  @ManyToMany(() => Article, (article) => article.tags)
  articles: Article[];
}
