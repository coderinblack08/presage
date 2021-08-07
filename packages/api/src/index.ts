require("dotenv-safe").config();
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import http from "http";
import morgan from "morgan";
import passport from "passport";
import { join } from "path";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { isDev } from "./lib/constants";
import { v1 } from "./modules/v1";

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

  const corsConfig = {
    origin: isDev()
      ? ["http://localhost:3000", "http://a12470b0dfbe.ngrok.io"]
      : "https://joinpresage.com",
    maxAge: !isDev() ? 86400 : undefined,
    credentials: true,
  };

  const app = express();
  app.set("trust proxy", 1);
  app.use(helmet());
  app.use(morgan("dev"));
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(cors(corsConfig));
  app.use(passport.initialize());
  passport.serializeUser((user: any, done) => done(null, user.accessToken));

  app.use("/v1", v1);
  app.use("/", v1);

  const server = http.createServer(app);
  // const io = new Server(server, { cors: corsConfig });
  // io.use((socket, next) => {
  //   const error = new Error("not authorized");
  //   const cookies = socket.request.headers.cookie;
  //   if (!cookies) return next(error);
  //   const token = cookie.parse(cookies)["jid"];
  //   if (!token) return next(error);
  //   try {
  //     const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
  //     (socket as any).userId = payload.userId;
  //     return next();
  //   } catch {}

  //   return next(error);
  // });
  // createMessageSocket(io);
  server.listen(4000, () => console.log("🚀 Server started on port 4000"));
}

main().catch(console.error);
