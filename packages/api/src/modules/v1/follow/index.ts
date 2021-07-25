import { Request, Router } from "express";
import createHttpError from "http-errors";
import { getConnection } from "typeorm";
import { User } from "../../../entities/User";
import { limiter } from "../../../lib/rateLimit";
import { isAuth } from "../auth/isAuth";

const router = Router();

router.post(
  "/follow/:id",
  limiter({ max: 100 }),
  isAuth(true),
  async (req: Request<{ id: string }>, res, next) => {
    if (req.userId === req.params.id) {
      return next(createHttpError(500, "Can't follow yourself"));
    }
    const user = await User.findOne(req.params.id);
    if (!user) {
      return next(createHttpError(500, "User doesn't exist"));
    }
    const connection = getConnection();
    const followed = await connection.query(
      `select * from user_followers_user where "userId_1" = $1 and "userId_2" = $2`,
      [req.params.id, req.userId]
    );
    if (followed.length) {
      await connection.transaction(async (em) => {
        await em.query(
          `delete from user_followers_user where "userId_1" = $1 and "userId_2" = $2`,
          [req.params.id, req.userId]
        );
        await em
          .createQueryBuilder()
          .update(User)
          .where({ id: req.params.id })
          .set({ followersCount: () => '"followersCount" - 1' })
          .execute();
        await em
          .createQueryBuilder()
          .update(User)
          .where({ id: req.userId })
          .set({ followingCount: () => '"followingCount" - 1' })
          .execute();
      });
    } else {
      await connection.transaction(async (em) => {
        await em.query(
          `
          insert into user_followers_user("userId_1", "userId_2")
          values($1, $2);
          `,
          [req.params.id, req.userId]
        );
        await em
          .createQueryBuilder()
          .update(User)
          .where({ id: req.params.id })
          .set({ followersCount: () => '"followersCount" + 1' })
          .execute();
        await em
          .createQueryBuilder()
          .update(User)
          .where({ id: req.userId })
          .set({ followingCount: () => '"followingCount" + 1' })
          .execute();
      });
    }
    res.send(true);
  }
);

export default router;
