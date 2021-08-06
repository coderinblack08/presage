import { Request, Router } from "express";
import createHttpError from "http-errors";
import { FindConditions, getRepository } from "typeorm";
import { Article } from "../../../entities/Article";
import { Journal } from "../../../entities/Journal";
import { Like } from "../../../entities/Like";
import { UserPoints } from "../../../entities/UserPoints";
import { limiter } from "../../../lib/rateLimit";
import { redis } from "../../../lib/redis";
import { isAuth } from "../auth/isAuth";

export const articlesQueriesRouter = Router();

articlesQueriesRouter.get(
  "/last-opened",
  limiter({ max: 50 }),
  isAuth(true),
  async (req, res, next) => {
    const key = `last-opened:${req.userId}`;
    let lastOpened = JSON.parse((await redis.get(key)) || "[]") as string[];
    if (lastOpened.length > 0) {
      const article = await Article.findOne(lastOpened[0]);
      if (article) {
        return res.json(article);
      }
    }
    const journal = await Journal.findOne({
      where: { userId: req.userId },
      order: { createdAt: "ASC" },
    });
    if (journal) {
      const draft = await Article.create({
        title: "Untitled",
        userId: req.userId,
        journalId: journal.id,
      }).save();
      await redis.set(key, JSON.stringify([draft.id, ...lastOpened]));
      return res.json(draft);
    }
    return next(createHttpError(404, "No journal found"));
  }
);

articlesQueriesRouter.get(
  "/drafts",
  limiter({ max: 50 }),
  isAuth(true),
  async (req, res, next) => {
    try {
      const where: FindConditions<Article> = {
        userId: req.userId,
      };
      const { journalId, published } = req.query as any;
      if (journalId && journalId !== "null") where.journalId = journalId;
      if (published) where.published = published;

      const articles = await Article.find({
        where,
        order: { updatedAt: "DESC" },
        relations: ["tags"],
        select: ["id", "title", "published", "createdAt", "updatedAt"],
      });

      res.json(articles);
    } catch (error) {
      next(createHttpError(500, error));
    }
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
      const key = `last-opened:${req.userId}`;
      const lastOpened = (
        JSON.parse((await redis.get(key)) || "[]") as string[]
      ).filter((x) => x !== req.params.id);
      await redis.set(key, JSON.stringify([req.params.id, ...lastOpened]));
      res.json(article);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

articlesQueriesRouter.get(
  "/",
  limiter({ max: 50 }),
  isAuth(),
  async (req, res, next) => {
    const {
      userId,
      query,
      journalId,
      limit = "10",
      skip = "0",
    } = req.query as {
      query: string;
      userId: string;
      journalId: string;
      limit: string;
      skip: string;
    };

    /**
      Because of typeorm's inability to combine both order, inner join, and pagination, 
      we have to do this in two different queries
      O(2 * limit + offset) rather than O(limit + offset) 
    */
    let qb = getRepository(Article)
      .createQueryBuilder("article")
      .select("article.id")
      .where("article.published = true")
      .orderBy(`article."publishedDate"`, "DESC")
      .addOrderBy('article.points + article."referralCount"', "DESC");

    if (query) {
      qb = qb
        .andWhere("article.document @@ plainto_tsquery(:query)", { query })
        .addOrderBy(
          "ts_rank(article.document, plainto_tsquery(:query))",
          "DESC"
        );
    }

    if (userId) {
      qb = qb.andWhere('article."userId" = :userId', { userId });
    }

    if (journalId) {
      qb = qb.andWhere('article."journalId" = :journalId', { journalId });
    }

    try {
      const take = Math.min(+limit, 50) + 1;
      console.log(skip, take);

      const result = await qb
        .take(take)
        .skip(+skip)
        .getMany();
      const ids = result.map((x) => x.id);

      if (ids.length === 0) {
        return res.json({ data: [], hasMore: false });
      }

      let data = await getRepository(Article)
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.tags", "tags")
        .leftJoinAndSelect("article.user", "user")
        .leftJoinAndSelect("article.journal", "journal")
        .leftJoinAndSelect("article.likes", "likes", 'likes."userId" = :user', {
          user: req.userId,
        })
        .where("article.id IN (:...ids)", { ids })
        .getMany();

      data = data.map((x) => {
        const y: any = { ...x, liked: x.likes.length === 1 };
        delete y.likes;
        return y;
      });

      data = data.sort((a, b) => ids.indexOf(a.id) - ids.indexOf(b.id));
      console.log(
        data.map((x) => x.id),
        ids
      );

      const hasMore = data.length === take;
      res.json({
        data: hasMore ? data.slice(0, -1) : data,
        hasMore,
      });
    } catch (error) {
      next(createHttpError(500, error));
    }
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
        relations: ["user", "journal", "shoutouts"],
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
      if (article?.published === false) {
        return next(createHttpError(403, "Article not published yet"));
      }
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
      console.log(points);

      res.json(points);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);
