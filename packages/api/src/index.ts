require("dotenv").config();
import cors from "cors";
import express from "express";
import helmet from "helmet";
import { verify } from "jsonwebtoken";
import passport from "passport";
import { isDev } from "./lib/constants";
import { prisma } from "./lib/prisma";
import {
  AccessTokenData,
  createTokens,
  RefreshTokenData,
} from "./modules/auth/createTokens";
import { authRouter } from "./modules/auth/google";
import { postRouter } from "./modules/post";

const main = async () => {
  const app = express();
  app.use(helmet());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: "*",
      maxAge: !isDev() ? 86400 : undefined,
      exposedHeaders: [
        "access-token",
        "refresh-token",
        "content-type",
        "content-length",
      ],
    })
  );
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user: any, done) => {
    done(null, user.accessToken);
  });

  app.use(async (req, res, next) => {
    const accessToken = req.headers["access-token"];
    if (!accessToken || typeof accessToken !== "string") return next();
    try {
      const data = <AccessTokenData>(
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
      );
      req.userId = data.userId;
      return next();
    } catch {}

    const refreshToken = req.headers["refresh-token"];
    if (!refreshToken || typeof refreshToken !== "string") return next();

    let data;
    try {
      data = <RefreshTokenData>(
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
      );
    } catch {
      return next();
    }

    const user = await prisma.user.findFirst({ where: { id: data.userId } });
    if (!user || user.tokenVersion !== data.tokenVersion) {
      return next();
    }

    const tokens = createTokens(user);
    res.setHeader("refresh-token", tokens.refreshToken);
    res.setHeader("access-token", tokens.accessToken);
    req.userId = data.userId;

    next();
  });

  app.use("/api/auth", authRouter);
  app.use("/api/posts", postRouter);
  app.get("/api/me", async (req, res) =>
    res.json(
      req.userId
        ? await prisma.user.findFirst({ where: { id: req.userId } })
        : null
    )
  );
  app.listen(4000, () => console.log("Server started at port 4000"));
};

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
