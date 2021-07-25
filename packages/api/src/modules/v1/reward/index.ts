import { validate } from "class-validator";
import { Request, Router } from "express";
import createHttpError from "http-errors";
import { ClaimedReward } from "../../../entities/ClaimedReward";
import { Reward } from "../../../entities/Reward";
import { User } from "../../../entities/User";
import { UserPoints } from "../../../entities/UserPoints";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";

const router = Router();

router.post("/", limiter({ max: 20 }), isAuth(true), async (req, res, next) => {
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

router.patch(
  "/:id",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    const reward = await Reward.findOne(req.params.id);
    if (!reward) {
      return next(createHttpError(404, "Reward not found"));
    }
    reward.name = req.body.name;
    reward.description = req.body.description;
    reward.points = req.body.points;
    reward.link = req.body.link;
    reward.type = req.body.type;
    try {
      await validate(reward, { skipMissingProperties: true });
    } catch (error) {
      return next(createHttpError(422, error));
    }
    try {
      await reward.save();
      res.json(reward);
    } catch (error) {
      return next(createHttpError(500, error));
    }
  }
);

router.delete(
  "/:id",
  limiter({ max: 50 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    try {
      const result = await Reward.delete(req.params.id);
      res.json(result.raw);
    } catch (error) {
      return next(createHttpError(500, error));
    }
  }
);

router.get("/", limiter({ max: 50 }), isAuth(true), async (req, res, next) => {
  try {
    const rewards = await Reward.find({
      where: { user: { id: req.userId } },
      order: { points: "ASC" },
    });
    res.json(rewards);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

router.get("/:userId", limiter({ max: 50 }), async (req, res, next) => {
  try {
    const rewards = await Reward.find({
      where: { user: { id: req.params.userId } },
      order: { points: "ASC" },
    });
    res.json(rewards);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

router.post(
  "/claim/:rewardId",
  limiter({ max: 20 }),
  isAuth(true),
  async (req: Request<{ rewardId: string }>, res, next) => {
    try {
      const rewardId = req.params.rewardId;
      const reward = await Reward.findOne(rewardId);
      if (!reward) {
        return next(createHttpError(404, "Reward not found"));
      }

      const userPoints = await UserPoints.findOne({
        where: { userId: req.userId, creatorId: reward.userId },
      });
      if (!userPoints || userPoints.points < reward.points) {
        return next(createHttpError(403, "Not enough points"));
      }
      userPoints.points -= reward.points;
      await userPoints.save();

      const claimedReward = await ClaimedReward.create({
        reward: { id: reward.id },
        user: { id: req.userId },
      }).save();

      res.json(claimedReward);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

export default router;
