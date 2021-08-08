import Dropcursor from "@tiptap/extension-dropcursor";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import { generateHTML } from "@tiptap/html";
import StarterKit from "@tiptap/starter-kit";
import { validate } from "class-validator";
import { Request, Router } from "express";
import createHttpError from "http-errors";
import readingTime from "reading-time";
import sanitizeHtml from "sanitize-html";
import { getConnection } from "typeorm";
import { Article } from "../../../entities/Article";
import { Journal } from "../../../entities/Journal";
import { Like } from "../../../entities/Like";
import { Tag } from "../../../entities/Tag";
import { addToLastOpened, removeFromLastOpened } from "./lastOpened";
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
    await addToLastOpened(req.userId!, article);
    res.json(article);
  }
);

articlesMutationRouter.patch(
  "/:id",
  limiter({ max: 500 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    const article = await Article.findOne(req.params.id);
    if (!article) {
      return next(createHttpError(404, "Article not found"));
    }
    if (article.userId !== req.userId) {
      return next(createHttpError(403, "Not authorized"));
    }
    const { title, body: bodyJson, canonical } = req.body;
    if (bodyJson) {
      const body = sanitizeHtml(
        generateHTML(bodyJson, [
          StarterKit,
          Placeholder,
          Underline,
          Image,
          Dropcursor,
          Link,
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
      article.body = body;
      article.bodyJson = bodyJson;
      article.readingTime = readingTime(body).text;
    }
    if (title) {
      article.title = title;
    }
    if (canonical === "") {
      article.canonical = null;
    }
    if (canonical) {
      article.canonical = canonical;
    }
    if (typeof article.bodyJson !== "string" && article.bodyJson) {
      article.bodyJson = JSON.stringify(article.bodyJson);
    }
    const errors = await validate(article, { skipMissingProperties: true });
    if (errors.length > 0) {
      console.log(errors);

      return next(createHttpError(422, errors));
    }
    await article.save();
    res.json(article);
  }
);

articlesMutationRouter.patch(
  "/tags/:id",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    if (!Array.isArray(req.body.tags)) {
      return next(createHttpError(400, "tags is not an array"));
    }
    if (req.body.tags.length > 5) {
      return next(createHttpError(400, "tags are capped at 5 elements"));
    }
    const connection = getConnection();
    const article = await Article.findOne(req.params.id);
    if (!article) {
      next(createHttpError(500, "no article found"));
    }
    if (article?.userId !== req.userId) {
      return next(createHttpError(403, "Not authorized"));
    }
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
      const uniqueTags = [...new Set(req.body.tags)];
      const tags: Tag[] =
        req.body.tags.length === 0
          ? null
          : await em.query(
              `
              insert into tag("name", "usedBy") 
              values${uniqueTags
                .map((_, index: number) => `($${index + 1}, 1)`)
                .join(", ")}
              on conflict ("name")
              do update set "usedBy" = tag."usedBy" + 1
              returning *;
              `,
              uniqueTags
            );
      console.log(tags);
      if (req.body.tags.length > 0) {
        em.query(
          `
            insert into article_tags_tag("articleId", "tagId")
            values${uniqueTags
              .map((_, index: number) => `($1, $${index + 2})`)
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

articlesMutationRouter.delete(
  "/:id",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      await Article.delete({ id: req.params.id, userId: req.userId });
      await removeFromLastOpened(req.userId!, req.params.id);

      const count = await Article.count({ where: { userId: req.userId } });
      if (count === 0) {
        const journal = await Journal.findOne({
          where: { userId: req.userId },
          order: { createdAt: "ASC" },
        });
        if (!journal) {
          return res.send(true);
        }
        const article = await Article.create({
          title: "Untitled",
          userId: req.userId,
          journalId: journal.id,
        }).save();
        await addToLastOpened(req.userId!, article);
        return res.json(article);
      }
      return res.send(true);
    } catch (error) {
      return next(createHttpError(500, error));
    }
  }
);
