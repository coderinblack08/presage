import { Injectable } from "@nestjs/common";
import { Article } from "../article/article.entity";
import { Connection } from "typeorm";
import { Favorite } from "./favorite.entity";

@Injectable()
export class FavoriteService {
  constructor(private connection: Connection) {}

  async toggleFavorite(articleId: string, userId: string) {
    this.connection.transaction(async (em) => {
      try {
        const favoriteRepository = em.getRepository(Favorite);
        const body = { articleId, userId };

        let favorite = await favoriteRepository.findOne({ where: body });
        const hadFavorite = !!favorite;
        if (favorite) {
          await favoriteRepository.delete(body);
        } else {
          favorite = await favoriteRepository.create(body).save();
        }

        await em
          .getRepository(Article)
          .createQueryBuilder()
          .update({ points: () => `points ${hadFavorite ? "-" : "+"} 1` })
          .where("id = :id", { id: articleId })
          .execute();
      } catch (error) {
        throw error;
      }
    });
  }

  async isFavored(articleId: string, userId: string) {
    return !!(await this.connection
      .getRepository(Favorite)
      .findOne({ where: { articleId, userId } }));
  }
}
