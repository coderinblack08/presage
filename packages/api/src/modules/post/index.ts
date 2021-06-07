import { Router } from "express";
import { prisma } from "../../lib/prisma";

export const postRouter = Router();

postRouter.post("/", async (req, res, next) => {
  if (!req.userId) return next(new Error("not authorized"));

  const { content } = req.body;
  const post = await prisma.post.create({
    data: {
      user: {
        connect: { id: req.userId },
      },
      content,
    },
  });

  res.json(post);
});

postRouter.get("/", async (req, res) => {
  const { limit = 10 } = req.query;
  const posts = await prisma.post.findMany({
    take: parseInt(limit?.toString()),
    include: {
      user: true,
    },
  });
  res.json(posts);
});

postRouter.get("/:id", async (req, res) => {
  const post = await prisma.post.findFirst({
    where: { id: req.params.id },
    include: {
      user: true,
    },
  });
  res.json(post);
});
