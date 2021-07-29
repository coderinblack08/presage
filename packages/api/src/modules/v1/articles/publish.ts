import { Request, Router } from "express";
import { Article } from "../../../entities/Article";
import { Shoutout } from "../../../entities/Shoutout";
import { limiter } from "../../../lib/rateLimit";
import { redis } from "../../../lib/redis";
import { isAuth } from "../auth/isAuth";

export const publishRouter = Router();

publishRouter.post(
  "/publish/:id",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res) => {
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
      console.log(result);

      for (const key of result) {
        let value: any = await redis.get(key);
        if (value) {
          value = parseInt(value);
          if (value > 0) {
            await Shoutout.create({
              article: { id: req.params.id },
              user: { id: key.split(":")[2] },
            }).save();
            await redis.decr(key);
          }
          if (value === 1) {
            await redis.del(key);
          }
        }
      }
    });
    res.send(true);
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
