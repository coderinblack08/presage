import { Article } from "src/article/article.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";

@Entity("favorites")
export class Favorite extends BaseEntity {
  @PrimaryColumn()
  userId: string;

  @PrimaryColumn()
  articleId: string;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Article)
  article: Article;
}
