import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const postRouter = Router();

postRouter.post("/", async (req, res, next) => {
  if (!req.user) return next(new Error("not authorized"));

  const { content } = req.body;
  const post = await prisma.post.create({
    data: {
      user: {
        connect: { id: req.user?.id },
      },
      content,
    },
  });
  res.json(post);
});
