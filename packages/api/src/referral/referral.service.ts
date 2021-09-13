import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { nanoid } from "nanoid";
import { Connection, Repository } from "typeorm";
import { Referral } from "./referral.entity";

@Injectable()
export class ReferralService {
  constructor(
    @InjectRepository(Referral)
    private readonly referralRepository: Repository<Referral>,
    private connection: Connection
  ) {}

  async create(articleId: string, userId: string) {
    const code = nanoid(10);
    return this.referralRepository.create({ articleId, userId, code }).save();
  }

  async findOne(articleId: string, userId: string) {
    return this.referralRepository.findOne({ articleId, userId });
  }

  async findArticleByCode(code: string, userId: string) {
    this.connection.transaction(async (em) => {
      const referralRepository = em.getRepository(Referral);
      const referral = await referralRepository.findOne({
        where: { code },
        relations: ["article"],
      });
      if (!referral) {
        return null;
      }
      await referralRepository.increment({ code }, "shareCount", 1);
      em.query(
        `
        insert into points("userId", "writerId", "points")
        values($1, $2, 1)
        on conflict ("userId", "writerId")
        do update set "points" = "points" + 1;
      `,
        [userId, referral.article.userId]
      );
      return referral.articleId;
    });
  }
}
