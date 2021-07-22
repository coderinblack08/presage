import { validate } from "class-validator";
import { Router } from "express";
import createHttpError from "http-errors";
import { Reward } from "../../entities/Reward";
import { User } from "../../entities/User";
import { isAuth } from "../auth/isAuth";

const router = Router();

router.post("/", isAuth(true), async (req, res, next) => {
  const reward = new Reward();
  reward.name = req.body.name;
  reward.description = req.body.description;
  reward.points = req.body.points;
  reward.link = req.body.link;
  reward.type = req.body.type;
  reward.user = { id: req.userId } as User;
  try {
    await validate(reward);
  } catch (error) {
    return next(createHttpError(422, error));
  }
  try {
    const savedReward = await reward.save();
    res.json(savedReward);
  } catch (error) {
    return next(createHttpError(500, error));
  }
});

router.get("/:userId", async (req, res, next) => {
  try {
    const rewards = await Reward.find({ where: { userId: req.params.userId } });
    res.json(rewards);
  } catch (error) {
    next(createHttpError(500, error));
  }
});
