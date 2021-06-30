require("dotenv-safe").config();
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import passport from "passport";
import { join } from "path";
import "reflect-metadata";
import { Server } from "socket.io";
import { createConnection } from "typeorm";
import { isDev } from "./lib/constants";
import articlesRouter from "./modules/articles";
import authRouter from "./modules/auth";

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
  app.use("/", authRouter);
  app.use("/articles", articlesRouter);

  const server = http.createServer(app);
  // const io = new Server(server);
  server.listen(4000, () => console.log("🚀 Server started on port 4000"));
}

main().catch(console.error);
