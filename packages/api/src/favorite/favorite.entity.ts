import { Article } from "src/article/article.entity";
import { User } from "src/user/user.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";

export enum FavoriteType {
  Like = "Like",
  Bookmark = "Bookmark",
}

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

  @PrimaryColumn({
    type: "enum",
    enum: FavoriteType,
    default: FavoriteType.Like,
  })
  type: FavoriteType;
}
