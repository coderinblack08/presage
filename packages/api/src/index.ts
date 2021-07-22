require("dotenv-safe").config();
import "reflect-metadata";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import passport from "passport";
import { join } from "path";
import { createConnection } from "typeorm";
import { isDev } from "./lib/constants";
import articlesRouter from "./modules/articles";
import authRouter from "./modules/auth";
import journalRouter from "./modules/journals";
import commentRouter from "./modules/comment";
import followRouter from "./modules/follow";

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
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(
    cors({
      origin: isDev() ? "http://localhost:3000" : "https://joinpresage.com",
      maxAge: !isDev() ? 86400 : undefined,
      credentials: true,
    })
  );
  app.use(passport.initialize());
  passport.serializeUser((user: any, done) => done(null, user.accessToken));
  app.use("/", authRouter);
  app.use("/", followRouter);
  app.use("/articles", articlesRouter);
  app.use("/journals", journalRouter);
  app.use("/comments", commentRouter);

  const server = http.createServer(app);
  // const io = new Server(server);
  server.listen(4000, () => console.log("🚀 Server started on port 4000"));
}

main().catch(console.error);
