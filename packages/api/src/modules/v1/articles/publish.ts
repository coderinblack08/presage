import { Request, Router } from "express";
import { Article } from "../../../entities/Article";
import { isAuth } from "../auth/isAuth";

export const publishRouter = Router();

publishRouter.post(
  "/publish/:id",
  isAuth(true),
  async (req: Request<{ id: string }>, res) => {
    await Article.update(
      { id: req.params.id, userId: req.userId },
      {
        published: true,
        publishedDate: new Date().toUTCString(),
      }
    );
    res.send(true);
  }
);

publishRouter.post(
  "/unpublish/:id",
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
