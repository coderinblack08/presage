import { validate } from "class-validator";
import { Request, Router } from "express";
import createHttpError from "http-errors";
import { Journal } from "../../../entities/Journal";
import { getRandomPicture } from "../../../lib/constants";
import { removeFromLastOpened } from "../articles/lastOpened";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";

const router = Router();

router.get(
  "/me",
  limiter({ max: 100 }),
  isAuth(true),
  async (req, res, next) => {
    try {
      const journals = await Journal.find({
        where: { userId: req.userId },
        order: { createdAt: "ASC" },
      });
      res.json(journals);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

router.patch(
  "/:id",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      const journal = await Journal.findOne(req.params.id);
      if (!journal) {
        return next(createHttpError(404, "Journal not found"));
      }
      if (journal.userId !== req.userId) {
        return next(
          createHttpError(403, "You are not allowed to edit this journal")
        );
      }
      if (req.body.name) journal.name = req.body.name;
      if (req.body.description || req.body.description === "") {
        journal.description = req.body.description;
      }
      const errors = await validate(journal, { skipMissingProperties: true });
      if (errors.length > 0) {
        console.log(errors);
        return next(createHttpError(422, errors));
      }
      journal.save();
      res.json(journal);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

router.delete(
  "/:id",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      const journal = await Journal.findOne(req.params.id, {
        relations: ["articles"],
      });
      if (!journal) {
        return next(createHttpError(404, "Journal not found"));
      }
      if (journal.userId !== req.userId) {
        return next(
          createHttpError(403, "You are not allowed to delete this journal")
        );
      }
      await removeFromLastOpened(req.userId, journal.articles);
      await journal.softRemove();
      const journals = await Journal.count({ where: { userId: req.userId } });
      if (journals === 0) {
        await Journal.create({
          user: { id: req.userId },
          name: "Blog",
          picture: getRandomPicture(),
        }).save();
      }
      res.json(journal);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

router.get("/:user", limiter({ max: 50 }), async (req, res, next) => {
  try {
    const journals = await Journal.find({ where: { userId: req.params.user } });
    res.json(journals);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

router.get("/id/:id", limiter({ max: 50 }), async (req, res, next) => {
  try {
    const journal = await Journal.findOne(req.params.id);
    res.json(journal);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

router.post("/", limiter({ max: 20 }), isAuth(true), async (req, res, next) => {
  try {
    const journal = Journal.create({
      user: { id: req.userId },
      name: req.body.name,
      description: req.body.description,
      picture: getRandomPicture(),
    });
    const errors = await validate(journal, { skipMissingProperties: true });
    if (errors.length > 0) {
      console.log(errors);
      return next(createHttpError(422, errors));
    }
    await journal.save();
    console.log(journal);
    res.json(journal);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

export default router;
