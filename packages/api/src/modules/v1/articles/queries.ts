import { Request, Router } from "express";
import createHttpError from "http-errors";
import { FindConditions, getConnection } from "typeorm";
import { Article } from "../../../entities/Article";
import { Like } from "../../../entities/Like";
import { UserPoints } from "../../../entities/UserPoints";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";

export const articlesQueriesRouter = Router();

articlesQueriesRouter.get(
  "/drafts",
  limiter({ max: 50 }),
  isAuth(true),
  async (req, res) => {
    const where: FindConditions<Article> = {
      userId: req.userId,
    };
    const { journalId, published } = req.query as any;
    if (journalId && journalId !== "null") where.journalId = journalId;
    if (published) where.published = published;
    console.log(where);

    const articles = await Article.find({
      where,
      order: { updatedAt: "DESC" },
      relations: ["tags"],
      select: ["id", "title", "published", "createdAt", "updatedAt"],
    });
    res.json(articles);
  }
);

articlesQueriesRouter.get(
  "/draft/:id",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      const article = await Article.findOne({
        where: { id: req.params.id, userId: req.userId },
        relations: ["journal"],
      });
      res.json(article);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

articlesQueriesRouter.delete(
  "/:id",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      await Article.delete({ id: req.params.id, userId: req.userId });
      res.send(true);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

articlesQueriesRouter.get(
  "/",
  limiter({ max: 50 }),
  isAuth(),
  async (req, res) => {
    const query: string = (req.query as any).query;
    const journalId: string = (req.query as any).journalId;
    const userId: string = (req.query as any).userId;
    let qb = getConnection()
      .getRepository(Article)
      .createQueryBuilder("article")
      .leftJoinAndSelect("article.tags", "tags")
      .leftJoinAndSelect("article.user", "user")
      .leftJoinAndSelect("article.journal", "journal")
      .leftJoinAndSelect("article.likes", "likes", 'likes."userId" = :user', {
        user: req.userId,
      });

    let data: Article[];

    if (query) {
      qb = qb
        .where(
          `article.document @@ plainto_tsquery(:query) and article.published = true ${
            userId ? 'and article."userId" = :user' : ""
          }`,
          { query, user: userId }
        )
        .orderBy("ts_rank(article.document, plainto_tsquery(:query))", "DESC");
    }

    if (journalId) {
      data = await qb
        .where(
          `article.published = true and article."journalId" = :journal ${
            userId ? 'and article."userId" = :user' : ""
          }`,
          {
            journal: journalId,
            user: userId,
          }
        )
        .orderBy('article."createdAt"', "DESC")
        .limit(10)
        .getMany();
    }

    if (!query && !journalId) {
      qb = qb
        .where(
          `article.published = true ${
            userId ? 'and article."userId" = :user' : ""
          }`,
          { user: userId }
        )
        .orderBy('article."createdAt"', "DESC");
    }

    data = await qb.limit(10).getMany();
    res.json(
      data.map((x) => {
        const y: any = { ...x, liked: x.likes.length === 1 };
        delete y.likes;

        return y;
      })
    );
  }
);

articlesQueriesRouter.get(
  "/:id",
  limiter({ max: 50 }),
  isAuth(),
  async (req: Request<{ id: string }>, res, next) => {
    if (!req.params.id) res.sendStatus(500);
    try {
      const article = await Article.findOne(req.params.id, {
        relations: ["user", "journal"],
      });
      // let comments = await getConnection()
      //   .getRepository(Comment)
      //   .createQueryBuilder("comment")
      //   .leftJoinAndSelect("comment.user", "user")
      //   .where('comment."articleId" = :id', { id: req.params.id })
      //   .getMany();
      // comments = comments.sort(
      //   (a: any, b: any) => a.path.length - b.path.length
      // );
      // const tree = [];
      // let i = 0;
      // while (comments.length < i) {
      //   if (comments[i].path.length > 1) break;
      //   tree.push({ ...comments[i], children: [] });
      //   i++;
      // }
      // for (let j = i; j < comments.length; j++) {
      //   const node = comments[j];
      //   const depth = node.path.length - 2;
      //   let treeNode: any = tree.find((x) => x.id === node.path[0]);
      //   for (let k = 0; k < depth; k++) {
      //     treeNode = treeNode.children.find(
      //       (x: any) => x.id === node.path[k + 1]
      //     );
      //   }
      //   treeNode.children.push({ ...node, children: [] });
      // }
      const body = { ...article };
      if (req.userId) {
        const like = await Like.findOne({
          where: { userId: req.userId, articleId: req.params.id },
        });
        return res.json({
          ...body,
          liked: like !== undefined,
        });
      }

      return res.json(body);
    } catch (e) {
      return next(createHttpError(500, e));
    }
  }
);

articlesQueriesRouter.get(
  "/points/:creatorId",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{ creatorId: string }>, res, next) => {
    try {
      const points = await UserPoints.findOne({
        where: { userId: req.userId, creatorId: req.params.creatorId },
      });
      res.json(points);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);
