import { validate } from "class-validator";
import { CookieOptions, Request, Router } from "express";
import createHttpError from "http-errors";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import { getConnection } from "typeorm";
import {
  adjectives,
  animals,
  colors,
  NumberDictionary,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { Article } from "../../../entities/Article";
import { Journal } from "../../../entities/Journal";
import { User } from "../../../entities/User";
import { isDev } from "../../../lib/constants";
import { limiter } from "../../../lib/rateLimit";
import { createToken } from "./createToken";
import { isAuth } from "./isAuth";

const router = Router();
const pictures = [
  "magenta-purple",
  "orange",
  "plum-fuchsia",
  "purple-orange-sky",
  "rosy-pink",
  "yellow-lime",
];

const strategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `http://localhost:4000/auth/google/callback`,
  },
  async (_, __, { id, displayName, photos, emails }, done) => {
    try {
      const email = emails ? emails[0].value : null;
      const photo = photos ? photos[0].value : null;

      let user = await User.findOne({ where: { googleId: id } });
      const data = {
        username: uniqueNamesGenerator({
          dictionaries: [
            adjectives,
            colors,
            animals,
            NumberDictionary.generate({ min: 10, max: 99 }),
          ],
          separator: "-",
        }),
        displayName: displayName,
        googleId: id,
        email: email,
        profilePicture: photo,
      };
      if (!user) {
        user = await User.create(data).save();
        await Journal.create({
          user: { id: user.id },
          name: "Blog",
          description: `${user.displayName}’s personal journal dedicated to blogging`,
          picture: `http://localhost:3000/profile-picture/${
            pictures[Math.floor(Math.random() * pictures.length)]
          }.jpeg`,
        }).save();
      }
      return done(null, { accessToken: createToken(user) });
    } catch (error) {
      return done(error, undefined);
    }
  }
);

passport.use(strategy);

router.get(
  "/auth/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
  })
);

const options: CookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  domain: isDev() ? undefined : ".joinpresage.com",
};

router.get(
  "/auth/google/callback",
  limiter({ max: 20 }),
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    res.cookie("jid", req.user.accessToken, options);
    res.redirect("http://localhost:3000/redirect");
  }
);

if (isDev()) {
  router.post("/auth/test-user", limiter({ max: 20 }), async (_, res, next) => {
    try {
      const user = await User.create({
        username: uniqueNamesGenerator({
          dictionaries: [
            adjectives,
            colors,
            animals,
            NumberDictionary.generate({ min: 10, max: 99 }),
          ],
          separator: "-",
        }),
        displayName: "Test User",
        email: "test@gmail.com",
        profilePicture: "https://placekitten.com/100/100",
      }).save();
      await Journal.create({
        user: { id: user.id },
        name: "Blog",
        description: `${user.displayName}’s personal journal dedicated to blogging`,
        picture: `http://localhost:3000/profile-picture/${
          pictures[Math.floor(Math.random() * pictures.length)]
        }.jpeg`,
      }).save();
      const accessToken = createToken(user);
      res.cookie("jid", accessToken, options);
      res.json({ accessToken });
    } catch (error) {
      next(createHttpError(500, error));
    }
  });
}

router.get("/me", limiter({ max: 100 }), isAuth(), async (req, res, next) => {
  try {
    const user = req.userId ? await User.findOne(req.userId) : null;
    res.json(user);
  } catch (error) {
    next(createHttpError(500, error));
  }
});

router.get(
  "/user/:username",
  limiter({ max: 100 }),
  isAuth(),
  async (req: Request<{ username: string }>, res, next) => {
    try {
      const user = await User.findOne({
        where: { username: req.params.username },
      });
      if (!user) return res.json({});
      const data = await getConnection()
        .getRepository(Article)
        .createQueryBuilder("article")
        .leftJoinAndSelect("article.tags", "tags")
        .leftJoinAndSelect("article.user", "user")
        .leftJoinAndSelect("article.journal", "journal")
        .leftJoinAndSelect("article.likes", "likes", 'likes."userId" = :user', {
          user: req.userId,
        })
        .orderBy('article."createdAt"', "DESC")
        .where('article.published = true and article."userId" = :user', {
          user: user.id,
        })
        .limit(6)
        .getMany();

      const articles = data.map((x) => {
        const y: any = { ...x, liked: x.likes.length === 1 };
        delete y.likes;

        return y;
      });
      if (req.userId) {
        const following = await getConnection().query(
          `select * from user_followers_user where "userId_1" = $1 and "userId_2" = $2`,
          [user.id, req.userId]
        );
        return res.json({
          ...user,
          articles,
          isFollowing: following.length > 0,
        });
      } else {
        return res.json({ ...user, articles });
      }
    } catch (error) {
      return next(createHttpError(500, error));
    }
  }
);

router.patch(
  "/user",
  limiter({ max: 20 }),
  isAuth(true),
  async (req, res, next) => {
    const user = await User.findOne(req.userId);
    if (!user) {
      return next(createHttpError(404, "User not found"));
    }
    const { displayName, username, email, bio, profilePicture } = req.body;
    if (displayName) user.displayName = displayName;
    if (username) user.username = username;
    if (email) user.email = email;
    if (bio) user.bio = bio;
    if (profilePicture) user.profilePicture = profilePicture;
    const errors = await validate(user, { skipMissingProperties: true });
    if (errors.length > 0) {
      return next(createHttpError(422, errors));
    }
    try {
      await user.save();
      return res.json(user);
    } catch (error) {
      return next(createHttpError(500, error));
    }
  }
);

router.post("/logout", limiter({ max: 20 }), isAuth(true), (_, res) => {
  res.clearCookie("jid", options);
  res.send("Logged out successfully");
});

export default router;
