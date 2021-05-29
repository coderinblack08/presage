import { Router } from "express";
import passport from "passport";
import rug from "random-username-generator";
import { Strategy } from "passport-google-oauth20";
import { User } from "../../entities/User";

export const authRouter = Router();

const strategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
  },
  async (_, __, { id, displayName, photos, emails }, done) => {
    try {
      const user =
        (await User.findOne({ where: { googleId: id } })) || User.create();
      const email = emails ? emails[0].value : null;
      const photo = photos ? photos[0].value : null;

      if (!user.id) {
        user.username = rug.generate();
        user.displayName = displayName;
        user.googleId = id;
        user.email = email;
        user.profilePicture = photo;
      }

      await user.save();
      return done(null, { id: user.id });
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
    session: true,
  })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successReturnToOrRedirect: "http://localhost:3000",
    session: true,
  })
);
