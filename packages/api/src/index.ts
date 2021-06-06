import dotenv from "dotenv";
dotenv.config();

import express from "express";
import passport from "passport";
import { authRouter } from "./modules/auth/google";
import redis from "redis";
import session from "express-session";
import connectRedis from "connect-redis";
import { isDev } from "./lib/constants";
import helmet from "helmet";
import { prisma } from "./lib/prisma";

const main = async () => {
  const RedisStore = connectRedis(session);
  const redisClient = redis.createClient();
  const app = express();

  app.use(helmet());
  app.use(
    session({
      name: "qid",
      store: new RedisStore({
        client: redisClient,
        disableTouch: true,
      }),
      cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 365 * 10,
        httpOnly: true,
        sameSite: "lax",
        secure: !isDev(),
      },
      saveUninitialized: false,
      secret: process.env.SESSION_SECRET!,
      resave: false,
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) =>
    done(null, await prisma.user.findFirst({ where: { id } }))
  );

  app.use("/api/auth", authRouter);
  app.listen(4000, () => console.log("Server started at port 4000"));
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
