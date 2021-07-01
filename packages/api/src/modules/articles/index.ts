import { Request, Router } from "express";
import createHttpError from "http-errors";
import { getConnection } from "typeorm";
import { Article } from "../../entities/Article";
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

router.post(
  "/publish/:id",
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    if (!Array.isArray(req.body.tags)) {
      next(createHttpError(400, "tags is not an array"));
    }
    if (req.body.tags.length > 5) {
      next(createHttpError(400, "tags are capped at 5 elements"));
    }
    const connection = getConnection();
    await connection.transaction(async (em) => {
      const tags = [];
      for (const tag of req.body.tags) {
        const newTag = await em.query(
          `
            insert into tag("name", "usedBy") 
            values($1, 1) 
            on conflict ("name") 
            do update set "usedBy" = tag."usedBy" + 1
            returning *;
          `,
          [tag]
        );
        await em.query(
          `
            insert into article_tags_tag("articleId", "tagId")
            values($1, $2);
          `,
          [req.params.id, newTag[0].id]
        );
        tags.push(newTag[0]);
      }
      await em.update(Article, req.params.id, {
        published: true,
      });
      res.json(tags);
    });
  }
);

router.get("/drafts", isAuth(true), async (req, res) => {
  const articles = await Article.find({
    where: { userId: req.userId },
    order: { updatedAt: "DESC" },
    select: ["id", "title", "published", "createdAt", "updatedAt"],
  });
  res.json(articles);
});

router.get("/:id", async (req, res, next) => {
  try {
    const article = await Article.findOne({ where: { id: req.params.id } });
    res.json(article);
  } catch (error) {
    next(createHttpError(401, error));
  }
});

export default router;
