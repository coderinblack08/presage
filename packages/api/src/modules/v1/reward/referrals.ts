import { nanoid } from "nanoid";
import { Request, Router } from "express";
import { sign, verify } from "jsonwebtoken";
import { redis } from "../../../lib/redis";
import { isAuth } from "../auth/isAuth";
import createHttpError from "http-errors";
import { User } from "../../../entities/User";
import { getConnection } from "typeorm";

const router = Router();

type Referral = { jwt: string; articleId: string; used: boolean };

router.post(
  "/:articleId",
  isAuth(true),
  async (req: Request<{ articleId: string }>, res, next) => {
    const jwt = sign(
      { referrerId: req.userId, articleId: req.params.articleId },
      process.env.REFERRAL_TOKEN_SECRET!,
      { expiresIn: "3d" }
    );
    const token = nanoid();
    await redis.set(
      `referrer:${token}`,
      JSON.stringify({ jwt, articleId: req.params.articleId, used: false })
    );
    res.json({ token });
  }
);

router.get(
  "/token/:token",
  isAuth(),
  async (req: Request<{ token: string }>, res, next) => {
    const referrer = await redis.get(`referrer:${req.params.token}`);
    if (!referrer) {
      return next(createHttpError(404, "Token not found"));
    }
    const data: Referral = JSON.parse(referrer);
    try {
      const jwtData: any = verify(data.jwt, process.env.REFERRAL_TOKEN_SECRET!);
      if (data.used === false) {
        try {
          await redis.set(
            `referrer:${req.params.token}`,
            JSON.stringify({
              ...data,
              used: true,
            })
          );
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
    res.json(data);
  }
);

export default router;
