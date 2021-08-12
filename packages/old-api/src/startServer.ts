require("dotenv-safe").config();
import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import passport from "passport";
import { isDev } from "./lib/constants";
import { v1 } from "./modules/v1";
import { createTypeormConn } from "./typeorm";

export const startServer = async () => {
  const app = express();
  await createTypeormConn();
  const corsConfig = {
    origin: isDev()
      ? ["http://localhost:3000", "http://a12470b0dfbe.ngrok.io"]
      : "https://joinpresage.com",
    maxAge: !isDev() ? 86400 : undefined,
    credentials: true,
  };

  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(corsConfig));
  app.use(passport.initialize());
  passport.serializeUser((user: any, done) => done(null, user.accessToken));

  app.use("/", v1);
  app.use("/v1", v1);
  const server = app.listen(process.env.PORT || 4000, () =>
    console.log("🚀 Server started on port 4000")
  );

  return { app, server };
};
