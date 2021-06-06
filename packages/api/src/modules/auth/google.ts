import { Router } from "express";
import passport from "passport";
import rug from "random-username-generator";
import { Strategy } from "passport-google-oauth20";

export const authRouter = Router();

const strategy = new Strategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID!,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    callbackURL: `${process.env.SERVER_URL}/api/auth/google/callback`,
  },
  async (_, __, { id, displayName, photos, emails }, done) => {
    try {
      const user: any = {};
      const email = emails ? emails[0].value : null;
      const photo = photos ? photos[0].value : null;

      user.username = rug.generate();
      user.displayName = displayName;
      user.googleId = id;
      user.email = email;
      user.profilePicture = photo;

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
    successReturnToOrRedirect: process.env.AUTH_REDIRECT_URL,
    session: true,
  })
);
