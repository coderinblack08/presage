import { Injectable } from "@nestjs/common";
import { InjectConnection, InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/articles/articles.entity";
import { Connection, Repository } from "typeorm";
import { Reaction, ReactionType } from "./reactions.entity";

@Injectable()
export class ReactionsService {
  constructor(
    @InjectRepository(Reaction)
    private reactionsRepository: Repository<Reaction>,
    @InjectConnection() private connection: Connection
  ) {}

  async status(userId: string, articleId: string) {
    const reactions = await this.reactionsRepository.find({
      where: { articleId, userId },
    });
    const status = {
      like: false,
      comment: false,
      share: false,
    };
    reactions.forEach((r) => {
      status[r.type] = true;
    });
    return status;
  }

  async toggle(type: ReactionType, userId: string, articleId: string) {
    const reaction = await this.reactionsRepository.findOne({
      where: { articleId, userId, type },
    });
    if (reaction) {
      await this.connection.transaction(async (tm) => {
        await tm.getRepository(Reaction).delete({ articleId, userId, type });
        await tm
          .getRepository(Article)
          .increment({ id: articleId }, `${type}Count`, -1);
      });
    } else {
      await this.connection.transaction(async (tm) => {
        await tm
          .getRepository(Reaction)
          .create({
            articleId,
            userId,
            type,
          })
          .save();
        await tm
          .getRepository(Article)
          .increment({ id: articleId }, `${type}Count`, 1);
      });
    }
  }
}
