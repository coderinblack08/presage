import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import rug from "random-username-generator";
import { getConnection } from "typeorm";
import * as yup from "yup";
import { User } from "../../entity/User";
import { isAuth } from "../../lib/isAuth";
import { createTokens } from "./createTokens";

export const authRouter = Router();

const strategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
  },
  async (_, __, { id, displayName, photos, emails }, done) => {
    try {
      const email = emails ? emails[0].value : null;
      const photo = photos ? photos[0].value : null;

      let user = await User.findOne({ where: { googleId: id } });
      const data = {
        username: rug.generate(),
        displayName: displayName,
        googleId: id,
        email: email,
        profilePicture: photo,
      };

      if (!user) {
        user = await User.create(data).save();
      }

      return done(null, createTokens(user));
    } catch (error) {
      return done(error, undefined);
    }
  }
);

passport.use(strategy);
authRouter.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    session: false,
  }),
  (req: any, res) => {
    res.redirect(
      `${process.env.AUTH_REDIRECT_URL}/?access_token=${req.user.accessToken}&refresh_token=${req.user.refreshToken}`
    );
  }
);

authRouter.get("/:username", async (req, res) => {
  res.json(
    await User.findOne(
      { username: req.params.username },
      {
        select: [
          "id",
          "username",
          "displayName",
          "bio",
          "profilePicture",
          "createdAt",
          "updatedAt",
        ],
      }
    )
  );
});

authRouter.patch("/", isAuth(true), async (req, res, next) => {
  const { username, displayName, bio } = req.body;

  const userSchema = yup.object().shape({
    username: yup
      .string()
      .strip()
      .max(16)
      .matches(/^\w+$/, "Alphanumeric values only")
      .nullable(),
    displayName: yup.string().trim().max(50).nullable(),
    bio: yup.string().max(100).nullable(),
  });

  try {
    await userSchema.validate(req.body);
  } catch (error) {
    next(new Error(error));
  }

  const user = await getConnection()
    .createQueryBuilder()
    .update(User)
    .set({
      username: username || undefined,
      displayName: displayName || undefined,
      bio: bio || undefined,
    })
    .where("id = :id", { id: req.userId })
    .returning("*")
    .execute();

  res.json(user.raw);
});
