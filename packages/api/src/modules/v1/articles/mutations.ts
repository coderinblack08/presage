import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { Request, Router } from "express";
import createHttpError from "http-errors";
import readingTime from "reading-time";
import sanitizeHtml from "sanitize-html";
import { getConnection } from "typeorm";
import { Article } from "../../../entities/Article";
import { Like } from "../../../entities/Like";
import { Tag } from "../../../entities/Tag";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";

export const articlesMutationRouter = Router();

articlesMutationRouter.post(
  "/like",
  limiter({ max: 50 }),
  isAuth(true),
  async (req, res) => {
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
  }
);

articlesMutationRouter.post(
  "/",
  limiter({ max: 50 }),
  isAuth(true),
  async (req, res) => {
    const article = await Article.create({
      title: "Untitled",
      userId: req.userId,
      journalId: req.body.journalId,
    }).save();
    res.json(article);
  }
);

articlesMutationRouter.patch(
  "/:id",
  limiter({ max: 500 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res) => {
    const bodyJson = req.body.body;
    const body = sanitizeHtml(
      generateHTML(bodyJson, [
        StarterKit,
        Placeholder,
        Underline,
        Image,
        Dropcursor,
      ]),
      {
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
      }
    );

    const article = await Article.update(
      { id: req.params.id, userId: req.userId },
      {
        body: body,
        bodyJson: req.body.body,
        readingTime: readingTime(body).text,
      }
    );
    res.json(article.raw);
  }
);

articlesMutationRouter.patch(
  "/tags/:id",
  limiter({ max: 50 }),
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