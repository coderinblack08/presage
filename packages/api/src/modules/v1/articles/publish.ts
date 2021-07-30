import { Request, Router } from "express";
import createHttpError from "http-errors";
import { getConnection, In } from "typeorm";
import { Article } from "../../../entities/Article";
import { ClaimedReward } from "../../../entities/ClaimedReward";
import { Shoutout } from "../../../entities/Shoutout";
import { limiter } from "../../../lib/rateLimit";
import { redis } from "../../../lib/redis";
import { isAuth } from "../auth/isAuth";

export const publishRouter = Router();

publishRouter.post(
  "/publish/:id",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      await Article.update(
        { id: req.params.id, userId: req.userId },
        {
          published: true,
          publishedDate: new Date().toUTCString(),
        }
      );

      const key = `shoutout:${req.userId}:*`;
      const stream = redis.scanStream({ match: key });
      stream.on("data", async (result) => {
        const userIds: string[] = [];

        for (const key of result) {
          let value: any = await redis.get(key);
          if (value) {
            value = parseInt(value);
            if (value > 0) {
              const userId = key.split(":")[2];
              userIds.push(userId);

              const where = {
                articleId: req.params.id,
                userId,
              };
              const shoutout = await Shoutout.findOne({ where });
              if (!shoutout) {
                await Shoutout.create(where).save();
              }

              await redis.decr(key);
            }
            if (value === 1) {
              await redis.del(key);
            }
          }
        }

        await getConnection()
          .createQueryBuilder()
          .update(ClaimedReward)
          .set({
            status: "successful",
            shoutoutArticle: req.params.id,
          })
          .where({ userId: In(userIds) })
          .execute();

        res.send(true);
      });
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

publishRouter.post(
  "/unpublish/:id",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res) => {
    await Article.update(
      { id: req.params.id, userId: req.userId },
      {
        published: false,
      }
    );
    res.send(true);
  }
);
