import { Request, Router } from "express";
import createHttpError from "http-errors";
import { Article } from "../../../entities/Article";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";
import { popFromShoutoutQueue } from "../reward/shoutout";

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

      await popFromShoutoutQueue(req.userId!, req.params.id);
      res.json(true);
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
