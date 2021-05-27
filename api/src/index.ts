import express from "express";
import { config } from "dotenv";
config();
import { PORT, __prod__ } from "./constants";
import passport from "passport";
import session from "express-session";
import Redis from "ioredis";
import { authRouter } from "./modules/auth";
import connectRedis from "connect-redis";

const main = async () => {
  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redis,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: __prod__,
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user: any, done) => done(null, user));
  passport.deserializeUser((user: any, done) => done(null, user));

  app.use("/api/auth", authRouter);
  app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
};

main().catch((e) => console.error(e));
