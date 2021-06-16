require("dotenv-safe").config();
import "reflect-metadata";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import { isDev } from "./lib/constants";
import authRouter from "./modules/auth";
import echoRouter from "./modules/echo";
import { createConnection } from "typeorm";
import { join } from "path";

async function main() {
  const conn = await createConnection({
    type: "postgres",
    database: "presagedb",
    entities: [join(__dirname, "./entities/*")],
    migrations: [join(__dirname, "./migrations/*")],
    logging: isDev(),
    synchronize: isDev(),
  });
  await conn.runMigrations();

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
  passport.serializeUser((user: any, done) => done(null, user.accessToken));
  app.use("/uploads", express.static(join(__dirname, "../uploads")));
  app.use("/auth", authRouter);
  app.use("/echo", echoRouter);
  app.listen(4000, () => console.log("Server started on port 4000"));
}

main().catch(console.error);
