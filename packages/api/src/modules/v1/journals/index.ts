import { Router } from "express";
import createHttpError from "http-errors";
import { Journal } from "../../../entities/Journal";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";

const router = Router();

router.get(
  "/me",
  limiter({ max: 100 }),
  isAuth(true),
  async (req, res, next) => {
    try {
      const journals = await Journal.find({ where: { userId: req.userId } });
      res.json(journals);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

router.get("/:user", limiter({ max: 100 }), async (req, res, next) => {
  try {
    const journals = await Journal.find({ where: { userId: req.params.user } });
    res.json(journals);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

router.post("/", limiter({ max: 20 }), isAuth(true), async (req, res, next) => {
  try {
    const pictures = [
      "magenta-purple",
      "orange",
      "plum-fuchsia",
      "purple-orange-sky",
      "rosy-pink",
      "yellow-lime",
    ];
    const journal = await Journal.create({
      user: { id: req.userId },
      name: req.body.name,
      description: req.body.description,
      picture: `http://localhost:3000/profile-picture/${
        pictures[Math.floor(Math.random() * pictures.length)]
      }.jpeg`,
    }).save();
    console.log(journal);
    res.json(journal);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

export default router;
