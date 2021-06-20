import { Router } from "express";
import passport from "passport";
import { Strategy } from "passport-google-oauth20";
import {
  adjectives,
  animals,
  colors,
  NumberDictionary,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { User } from "../../entities/User";
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
      }

      return done(null, { accessToken: createToken(user) });
    } catch (error) {
      return done(error, undefined);
    }
  }
);

passport.use(strategy);

router.get(
  "/google",
  passport.authenticate("google", {
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ],
    session: false,
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req: any, res) => {
    res.redirect(`http://localhost:3000/?accessToken=${req.user.accessToken}`);
  }
);

router.get("/me", isAuth(), async (req, res) => {
  res.json(
    req.userId
      ? await User.findOne(req.userId, {
          select: userFields,
        })
      : null
  );
});

router.get("/:username", async (req, res) => {
  const user = await User.findOne({
    where: { username: req.params.username },
    select: userFields,
  });
  res.json(user);
});

export default router;
