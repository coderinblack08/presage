require("dotenv").config();
import cors from "cors";
import express from "express";
import helmet from "helmet";
import passport from "passport";
import { join } from "path/posix";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { User } from "./entity/User";
import { isDev } from "./lib/constants";
import { isAuth } from "./lib/isAuth";
import { prisma } from "./lib/prisma";
import { authRouter } from "./modules/auth/google";
import { presageRouter } from "./modules/presage";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "presagedb",
    entities: [join(__dirname, "./entity/*")],
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
  app.use("/uploads", express.static(join(__dirname, "../uploads")));
  app.use(passport.initialize());
  app.use(passport.session());
  passport.serializeUser((user: any, done) => {
    done(null, user.accessToken);
  });

  app.use("/api/auth", authRouter);
  app.use("/api/presage", presageRouter);
  app.get("/api/me", isAuth(), async (req, res) =>
    res.json(req.userId ? await User.findOne(req.userId) : null)
  );
  app.listen(4000, () => console.log("Server started at port 4000"));
};

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });

process.on("SIGINT", () => process.exit());
