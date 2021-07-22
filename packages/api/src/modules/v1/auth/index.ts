import { Request, Router } from "express";
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
import { createToken } from "./createToken";
import { isAuth } from "./isAuth";

const router = Router();
const userFields: (keyof User)[] = [
  "id",
  "email",
  "username",
  "bio",
  "profilePicture",
  "displayName",
  "createdAt",
  "updatedAt",
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
        const pictures = [
          "magenta-purple",
          "orange",
          "plum-fuchsia",
          "purple-orange-sky",
          "rosy-pink",
          "yellow-lime",
        ];
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

const options = {
  httpOnly: true,
  domain: isDev() ? undefined : ".joinpresage.com",
};

router.get(
  "/auth/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    res.cookie("jid", req.user.accessToken, options);
    res.redirect("http://localhost:3000/?authRedirect=true");
  }
);

router.get("/me", isAuth(), async (req, res) => {
  const user = req.userId
    ? await User.findOne(req.userId, {
        select: userFields,
      })
    : null;
  res.json(user);
});

router.get(
  "/user/:username",
  isAuth(),
  async (req: Request<{ username: string }>, res) => {
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
      return res.json({ ...user, articles, isFollowing: following.length > 0 });
    } else {
      return res.json({ ...user, articles });
    }
  }
);

router.post("/logout", isAuth(true), (_, res) => {
  res.clearCookie("jid", options);
  res.send("Logged out successfully");
});

export default router;