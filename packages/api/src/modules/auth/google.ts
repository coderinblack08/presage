import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import rug from "random-username-generator";
import { prisma } from "../../lib/prisma";
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
      let user = await prisma.user.findFirst({ where: { googleId: id } });
      const data = {
        username: rug.generate(),
        displayName: displayName,
        googleId: id,
        email: email,
        profilePicture: photo,
      };

      if (!user) {
        user = await prisma.user.create({ data });
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
