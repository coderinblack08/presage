import { validate } from "class-validator";
import { Request, Router } from "express";
import createHttpError from "http-errors";
import SqlString from "sqlstring";
import { getConnection, getRepository, Not } from "typeorm";
import { ClaimedReward } from "../../../entities/ClaimedReward";
import { Reward } from "../../../entities/Reward";
import { User } from "../../../entities/User";
import { UserPoints } from "../../../entities/UserPoints";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";
import { pushToShoutoutQueue } from "./shoutout";

const router = Router();

router.post("/", limiter({ max: 20 }), isAuth(true), async (req, res, next) => {
  const reward = new Reward();

  reward.name = req.body.name;
  reward.description = req.body.description;
  reward.points = parseInt(req.body.points);
  if (req.body.link && req.body.type === "link") {
    reward.link = req.body.link;
  }
  reward.type = req.body.type;
  reward.user = { id: req.userId } as User;

  const errors = await validate(reward);
  if (errors.length > 0) {
    return next(createHttpError(422, errors));
  }
  try {
    await reward.save();
    res.json(reward);
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
    if (reward.userId !== req.userId) {
      return next(createHttpError(403, "Not authorized"));
    }
    reward.name = req.body.name;
    reward.description = req.body.description;
    reward.points = req.body.points;
    reward.link = req.body.link;
    reward.type = req.body.type;
    const errors = await validate(reward, { skipMissingProperties: true });
    if (errors.length > 0) {
      return next(createHttpError(422, errors));
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
      await getConnection().transaction(async (em) => {
        const reward = await em.getRepository(Reward).findOne({
          where: {
            id: req.params.id,
            userId: req.userId,
          },
        });
        if (!reward) {
          return next(createHttpError(404, "Reward doesn't exist"));
        }

        if (reward.type !== "shoutout" && reward.type !== "link") {
          const claimed = await em.getRepository(ClaimedReward).find({
            where: {
              rewardId: req.params.id,
              status: "pending",
            },
          });

          if (claimed.length > 0) {
            // refund users
            await em
              .createQueryBuilder()
              .update(UserPoints)
              .set({
                points: () => `$points + ${SqlString.escape(reward.points)}`,
              })
              .where(`"userId" IN (:...ids)`, {
                ids: claimed.map((x) => x.userId),
              })
              .andWhere(`"creatorId" = :id`, { id: reward.userId })
              .execute();

            // change status
            await em
              .createQueryBuilder()
              .update(ClaimedReward)
              .set({ status: "canceled" })
              .where("status = 'pending'")
              .andWhere(`"rewardId" = :id`, { id: reward.id })
              .execute();
          }
        }

        reward.softRemove();
        res.json(reward);
      });
    } catch (error) {
      return next(createHttpError(500, error));
    }
  }
);

router.get("/", limiter({ max: 50 }), isAuth(true), async (req, res, next) => {
  try {
    const rewards = await getRepository(Reward)
      .createQueryBuilder("reward")
      .addSelect("reward.link")
      .where('reward."userId" = :id', { id: req.userId })
      .orderBy({ points: "ASC" })
      .getMany();
    console.log(rewards);

    res.json(rewards);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

router.get(
  "/claimed",
  limiter({ max: 50 }),
  isAuth(true),
  async (req, res, next) => {
    try {
      const rewards = await getConnection().query(
        `
        select
          cr.*,
          to_jsonb(u) as user,
          to_jsonb(r) as reward
        from claimed_reward cr
        left join reward r on r.id = cr."rewardId"
        left join public.user u on u.id = r."userId"
        where cr."userId" = $1
        order by points desc;
      `,
        [req.userId]
      );
      res.json(rewards);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

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
      const [reward] = (await getConnection().query(
        `
        select * from reward where id = $1 and "deletedAt" is null;
        `,
        [rewardId]
      )) as [Reward];
      if (!reward) {
        return res.status(400).json({ message: "Reward not found" });
      }
      if (reward.userId === req.userId) {
        return res
          .status(403)
          .json({ message: "You can't claim your own reward" });
      }

      const userPoints = await UserPoints.findOne({
        where: { userId: req.userId, creatorId: reward.userId },
      });

      if (!userPoints || userPoints.points < reward.points) {
        return res.status(403).json({ message: "Not enough points" });
      }

      userPoints.points -= reward.points;
      await userPoints.save();

      const claimedReward = await ClaimedReward.create({
        reward: { id: reward.id },
        user: { id: req.userId },
        status: reward.type === "link" ? "successful" : "pending",
      }).save();

      if (reward.type === "link") {
        return res.json({ link: reward.link });
      }

      await pushToShoutoutQueue(req.userId!, reward.userId);
      res.json(claimedReward);
    } catch (error) {
      next(createHttpError(500, error));
    }
  }
);

export default router;
