import { Injectable } from "@nestjs/common";
import { Article } from "../article/article.entity";
import { Connection } from "typeorm";
import { Favorite, FavoriteType } from "./favorite.entity";

@Injectable()
export class FavoriteService {
  constructor(private connection: Connection) {}

  async toggleFavorite(
    articleId: string,
    userId: string,
    type = FavoriteType.Like
  ) {
    this.connection.transaction(async (em) => {
      try {
        const favoriteRepository = em.getRepository(Favorite);
        const body = { articleId, userId, type };

        let favorite = await favoriteRepository.findOne({ where: body });
        const hadFavorite = !!favorite;
        if (favorite) {
          await favoriteRepository.delete(body);
        } else {
          favorite = await favoriteRepository.create(body).save();
        }

        console.log(type, FavoriteType.Like);

        await em
          .getRepository(Article)
          .createQueryBuilder()
          .update({
            [type === FavoriteType.Like ? "points" : "bookmarks"]: () =>
              `${type === FavoriteType.Like ? "points" : "bookmarks"} ${
                hadFavorite ? "-" : "+"
              } 1`,
          })
          .where("id = :id", { id: articleId })
          .execute();
      } catch (error) {
        throw error;
      }
    });
  }

  async isFavored(articleId: string, userId: string, type = FavoriteType.Like) {
    return !!(await this.connection
      .getRepository(Favorite)
      .findOne({ where: { articleId, userId, type } }));
  }
}
