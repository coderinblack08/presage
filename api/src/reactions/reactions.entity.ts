import { User } from "src/users/user.entity";
import { BaseEntity, Entity, ManyToOne, PrimaryColumn } from "typeorm";
import { Article } from "../articles/articles.entity";

export enum ReactionType {
  LIKE = "like",
  SHARE = "share",
  COMMENT = "comment",
}

@Entity()
export class Reaction extends BaseEntity {
  @PrimaryColumn("enum", { enum: ReactionType })
  type: ReactionType;

  @PrimaryColumn()
  userId: string;

  @ManyToOne(() => User, (a) => a.reactions)
  user: User;

  @PrimaryColumn()
  articleId: string;

  @ManyToOne(() => Article, (a) => a.reactions)
  article: Article;
}
