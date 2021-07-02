import { Request, Router } from "express";
import createHttpError from "http-errors";
import { getConnection } from "typeorm";
import { Article } from "../../entities/Article";
import { Tag } from "../../entities/Tag";
import { isAuth } from "../auth/isAuth";

// export const createPublishSocket = (
//   io: Server<DefaultEventsMap, DefaultEventsMap, DefaultEventsMap>
// ) => {
//   io.on("connection", (socket) => {
//     socket.on(
//       "update draft",
//       async (id: string, data: QueryDeepPartialEntity<Article>) => {
//         await Article.update(id, data);
//       }
//     );
//   });
// };

const router = Router();
router.post("/", isAuth(true), async (req, res) => {
  const article = await Article.create({
    title: "Untitled",
    userId: req.userId,
  }).save();
  res.json(article);
});

router.patch(
  "/:id",
  isAuth(true),
  async (req: Request<{ id: string }>, res) => {
    const article = await Article.update(
      { id: req.params.id, userId: req.userId },
      req.body
    );
    res.json(article.raw);
  }
);

router.patch(
  "/tags/:id",
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    if (!Array.isArray(req.body.tags)) {
      next(createHttpError(400, "tags is not an array"));
    }
    if (req.body.tags.length > 5) {
      next(createHttpError(400, "tags are capped at 5 elements"));
    }
    const connection = getConnection();
    const article = await Article.findOne(req.params.id);
    if (!article) next(createHttpError(500, "no article found"));
    await connection.transaction(async (em) => {
      em.query(
        `
        update tag t
        set "usedBy" = t."usedBy" - 1
        where exists (
          select 1 from article_tags_tag a
          where a."articleId" = $1 and a."tagId" = t.id
        );
      `,
        [req.params.id]
      );
      em.query(
        `
          delete from article_tags_tag
          where "articleId" = $1;
        `,
        [req.params.id]
      );
      const tags: Tag[] =
        req.body.tags.length === 0
          ? null
          : await em.query(
              `
              insert into tag("name", "usedBy") 
              values${req.body.tags
                .map((_: string, index: number) => `($${index + 1}, 1)`)
                .join(", ")}
              on conflict ("name")
              do update set "usedBy" = tag."usedBy" + 1
              returning *;
              `,
              req.body.tags
            );
      console.log(tags);
      if (req.body.tags.length > 0) {
        em.query(
          `
            insert into article_tags_tag("articleId", "tagId")
            values${req.body.tags
              .map((_: string, index: number) => `($1, $${index + 2})`)
              .join(", ")};
          `,
          [req.params.id, ...tags.map((x) => x.id)]
        );
      }

      // connection.getRepository(Article).save({ id: req.params.id, tags });
      res.json(tags || []);
    });
  }
);

router.post(
  "/publish/:id",
  isAuth(true),
  async (req: Request<{ id: string }>, res) => {
    await Article.update(
      { id: req.params.id, userId: req.userId },
      {
        published: true,
      }
    );
    res.send(true);
  }
);

router.post(
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

router.get("/", isAuth(), async (req, res) => {
  const query: string = (req.query as any).query;
  const data = await getConnection()
    .createQueryBuilder(Article, "a")
    .select()
    .where("document @@ plainto_tsquery(:query)", {
      query: query,
    })
    .orderBy("ts_rank(document, plainto_tsquery(:query))", "DESC")
    .getMany();
  res.json(data);
});

router.get("/drafts", isAuth(true), async (req, res) => {
  const articles = await Article.find({
    where: { userId: req.userId },
    order: { updatedAt: "DESC" },
    select: ["id", "title", "published", "createdAt", "updatedAt"],
  });
  res.json(articles);
});

router.get(
  "/draft/:id",
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      const article = await Article.findOne({
        where: { id: req.params.id, userId: req.userId },
      });
      res.json(article);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

router.delete(
  "/:id",
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

export default router;
