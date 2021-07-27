import { Request, Router } from "express";
import createHttpError from "http-errors";
import { nanoid } from "nanoid";
import { Article } from "../../../entities/Article";
import { Referral } from "../../../entities/Referral";
import { UserPoints } from "../../../entities/UserPoints";
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
      return res.json(alreadyHasReferral);
    }

    const token = nanoid();
    try {
      const referral = await Referral.create({
        token,
        article: { id: req.params.articleId },
        referrer: { id: req.userId },
      }).save();
      article.referralCount = article.referralCount + 1;
      await article.save();
      res.json({ ...referral, new: true });
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
    if (req.userId && req.userId !== referral.referrerId) {
      try {
        referral.claimCount = referral.claimCount + 1;
        await referral.save();
      } catch (error) {
        return next(createHttpError(500, error));
      }
      if (referral.claimCount <= 3) {
        const article = await Article.findOne(referral.articleId);
        const body = {
          userId: referral.referrerId,
          creatorId: article?.userId,
        };
        const userPoints = await UserPoints.findOne({
          where: body,
        });
        if (userPoints) {
          userPoints.points = userPoints.points + 1;
          await userPoints.save();
        } else {
          await UserPoints.create({ ...body, points: 1 }).save();
        }
      }
    }
    res.json(referral);
  }
);

export default router;
