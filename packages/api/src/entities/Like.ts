import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Article } from "./Article";
import { User } from "./User";

@Entity()
export class Like extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (u) => u.likes, { onDelete: "CASCADE" })
  user: User[];

  @PrimaryColumn()
  articleId: Article[];

  @ManyToOne(() => Article, (a) => a.likes, { onDelete: "CASCADE" })
  article: Article[];
}
