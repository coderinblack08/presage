import { Request, Router } from "express";
import createHttpError from "http-errors";
import { getConnection } from "typeorm";
import { v4 } from "uuid";
import { Comment } from "../../../entities/Comment";
import { isAuth } from "../auth/isAuth";

const router = Router();

router.get("/:id", async (req, res) => {
  const parentId = req.query.parentId as string;
  const comment = parentId ? await Comment.findOne(parentId) : null;
  const comments = await getConnection()
    .getRepository(Comment)
    .createQueryBuilder("comment")
    .leftJoinAndSelect("comment.user", "user")
    .where(
      `comment."articleId" = :article and array_length(comment.path, 1) = :length + 1 ${
        comment ? "and comment.path && array[:id]" : ""
      }`,
      {
        article: req.params.id,
        length: comment ? comment.path.length : 0,
        id: comment ? comment.id : null,
      }
    )
    .orderBy('comment."createdAt"', "DESC")
    .getMany();
  res.json(comments);
});

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
