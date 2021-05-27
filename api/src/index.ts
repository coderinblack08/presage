import { config } from "dotenv";
config();
import { ApolloServer } from "apollo-server-express";
import connectRedis from "connect-redis";
import cors from "cors";
import express from "express";
import session from "express-session";
import Redis from "ioredis";
import passport from "passport";
import { join } from "path";
import "reflect-metadata";
import { buildSchema } from "type-graphql";
import { createConnection } from "typeorm";
import { PORT, __prod__ } from "./constants";
import { authRouter } from "./modules/auth/google";
import { HelloResolver } from "./modules/hello";

const main = async () => {
  const conn = await createConnection({
    type: "postgres",
    database: "presage",
    entities: [join(__dirname, "./entities/*")],
    migrations: [join(__dirname, "./migrations/*")],
    logging: !__prod__,
    synchronize: !__prod__,
  });
  await conn.runMigrations();

  const app = express();
  const RedisStore = connectRedis(session);
  const redis = new Redis();

  app.use(
    cors({
      origin: process.env.SERVER_URL,
      credentials: true,
    })
  );

  const apolloServer = new ApolloServer({
    schema: await buildSchema({ resolvers: [HelloResolver], validate: false }),
    context: async ({ req, res }) => ({ req, res, redis }),
  });

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

  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
};

main().catch((e) => console.error(e));
