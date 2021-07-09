import { Request, Router } from "express";
import createHttpError from "http-errors";
import { v4 } from "uuid";
import { Comment } from "../../entities/Comment";
import { isAuth } from "../auth/isAuth";

const router = Router();

router.post(
  "/:id",
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    const parent = req.body.parentId
      ? await Comment.findOne(req.body.parentId)
      : null;
    const id = v4();
    try {
      const comment = await Comment.create({
        id,
        message: req.body.message,
        user: { id: req.userId },
        article: { id: req.params.id },
        path: parent ? [...parent.path, id] : [id],
      }).save();
      res.json(comment);
    } catch (error) {
      next(createHttpError(error));
    }
  }
);

export default router;
