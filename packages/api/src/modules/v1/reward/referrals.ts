import { Request, Router } from "express";
import createHttpError from "http-errors";
import { sign, verify } from "jsonwebtoken";
import { nanoid } from "nanoid";
import { getConnection } from "typeorm";
import { Article } from "../../../entities/Article";
import { Referral } from "../../../entities/Referral";
import { User } from "../../../entities/User";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";

const router = Router();

router.get(
  "/:articleId",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{ articleId: string }>, res, next) => {
    try {
      const articleId = req.params.articleId;
      const referral = await Referral.findOne({
        where: { referrerId: req.userId, articleId },
      });
      res.json(referral);
    } catch (error) {
      next(createHttpError(404, "Referral not found"));
    }
  }
);

router.post(
  "/:articleId",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ articleId: string }>, res, next) => {
    const article = await Article.findOne({
      where: { id: req.params.articleId },
    });
    if (!article) {
      return next(createHttpError(404, "Article not found"));
    }
    const alreadyHasReferral = await Referral.findOne({
      where: { articleId: req.params.articleId, referrerId: req.userId },
    });
    if (alreadyHasReferral) {
      return res.json({ ...alreadyHasReferral, article });
    }
    const jwt = sign(
      { referrerId: req.userId, articleId: req.params.articleId },
      process.env.REFERRAL_TOKEN_SECRET!,
      { expiresIn: "3d" }
    );
    const token = nanoid();
    try {
      const referral = await Referral.create({
        token,
        jwt,
        article: { id: req.params.articleId },
        referrer: { id: req.userId },
      }).save();
      article.referralCount = article.referralCount + 1;
      await article.save();
      res.json({ ...referral, article, new: true });
    } catch (error) {
      next(createHttpError(500, "Internal Server Error"));
    }
  }
);

router.get(
  "/token/:token",
  limiter({ max: 50 }),
  isAuth(),
  async (req: Request<{ token: string }>, res, next) => {
    const referral = await Referral.findOne({
      where: { token: req.params.token },
    });
    if (!referral) {
      return next(createHttpError(404, "Token not found"));
    }
    try {
      const jwtData: any = verify(
        referral.jwt,
        process.env.REFERRAL_TOKEN_SECRET!
      );
      if (
        referral.claimed === false &&
        req.userId &&
        req.userId !== referral.referrerId
      ) {
        try {
          referral.claimed = true;
          referral.count = referral.count + 1;
          await referral.save();
        } catch (error) {
          return next(createHttpError(500, error));
        }
        await getConnection()
          .createQueryBuilder()
          .update(User)
          .where({ id: jwtData.referrerId })
          .set({ points: () => "points + 1" })
          .execute();
      }
    } catch {}
    res.json(referral);
  }
);

export default router;
