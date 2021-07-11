import { Request, Router } from "express";
import sanitizeHtml from "sanitize-html";
import createHttpError from "http-errors";
import readingTime from "reading-time";
import { getConnection, UsingJoinColumnIsNotAllowedError } from "typeorm";
import { Article } from "../../entities/Article";
import { Tag } from "../../entities/Tag";
import { isAuth } from "../auth/isAuth";
import { Like } from "../../entities/Like";
import { Comment } from "../../entities/Comment";

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

router.post("/like", isAuth(true), async (req, res) => {
  await getConnection().transaction(async (em) => {
    const body = { userId: req.userId, articleId: req.body.articleId };
    const existingLike = await em.findOne(Like, { where: body });

    if (existingLike) {
      await em.delete(Like, body);
      await em
        .createQueryBuilder()
        .update(Article)
        .where({ id: req.body.articleId })
        .set({ points: () => "points - 1" })
        .execute();
    } else {
      await em.create(Like, body).save();
      await em
        .createQueryBuilder()
        .update(Article)
        .where({ id: req.body.articleId })
        .set({ points: () => "points + 1" })
        .execute();
    }
    res.json(true);
  });
});

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
    req.body.body = sanitizeHtml(req.body.body, {
      ...sanitizeHtml.defaults,
      allowedTags: ["img", ...sanitizeHtml.defaults.allowedTags],
      allowedAttributes: {
        img: ["src", "align"],
        ...sanitizeHtml.defaults.allowedAttributes,
      },
      allowedSchemesByTag: {
        img: ["http", "https"],
        ...sanitizeHtml.defaults.allowedSchemesByTag,
      },
    });
    const article = await Article.update(
      { id: req.params.id, userId: req.userId },
      {
        ...req.body,
        readingTime: req.body.body ? readingTime(req.body.body).text : null,
      }
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
    .leftJoinAndSelect("a.user", "user")
    .leftJoinAndSelect("a.tags", "tags")
    .where("document @@ plainto_tsquery(:query) and a.published = true", {
      query: query,
    })
    .orderBy("ts_rank(document, plainto_tsquery(:query))", "DESC")
    .getMany();
  res.json(data);
});

router.get("/drafts", isAuth(true), async (req, res) => {
  const articles = await Article.find({
    where: { userId: req.userId, published: false },
    order: { updatedAt: "DESC" },
    relations: ["tags"],
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

router.get("/explore", isAuth(), async (req, res) => {
  const data = await getConnection()
    .getRepository(Article)
    .createQueryBuilder("article")
    .leftJoinAndSelect("article.tags", "tags")
    .leftJoinAndSelect("article.user", "user")
    .leftJoinAndSelect("article.likes", "likes", 'likes."userId" = :user', {
      user: req.userId,
    })
    .orderBy('article."createdAt"', "DESC")
    .where("article.published = true")
    .limit(6)
    .getMany();

  res.json(
    data.map((x) => {
      const y: any = { ...x, liked: x.likes.length === 1 };
      delete y.likes;

      return y;
    })
  );
});

router.get(
  "/:id",
  isAuth(),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      const article = await Article.findOne(req.params.id, {
        relations: ["user"],
      });
      let comments = await getConnection()
        .getRepository(Comment)
        .createQueryBuilder("comment")
        .leftJoinAndSelect("comment.user", "user")
        .where('comment."articleId" = :id', { id: req.params.id })
        .getMany();

      comments = comments.sort(
        (a: any, b: any) => a.path.length - b.path.length
      );
      const tree = [];
      let i = 0;
      while (true) {
        if (comments[i].path.length > 1) break;
        tree.push({ ...comments[i], children: [] });
        i++;
      }
      for (let j = i; j < comments.length; j++) {
        const node = comments[j];
        const depth = node.path.length - 2;
        let treeNode: any = tree.find((x) => x.id === node.path[0]);
        for (let k = 0; k < depth; k++) {
          treeNode = treeNode.children.find(
            (x: any) => x.id === node.path[k + 1]
          );
        }
        treeNode.children.push({ ...node, children: [] });
      }

      const body = { ...article, comments: tree };
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
    } catch (error) {
      return next(createHttpError(500, error));
    }
  }
);

export default router;
