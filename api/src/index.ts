import { config } from "dotenv";
config();
import { ApolloError, ApolloServer } from "apollo-server-express";
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
import { UserResolver } from "./modules/auth";
import {
  fieldExtensionsEstimator,
  getComplexity,
  simpleEstimator,
} from "graphql-query-complexity";
import { User } from "./entities/User";

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
      origin: "http://localhost:3000",
      credentials: true,
    })
  );

  const schema = await buildSchema({
    resolvers: [HelloResolver, UserResolver],
    validate: false,
  });
  const apolloServer = new ApolloServer({
    schema,
    context: async ({ req, res }) => ({ req, res, redis }),
    plugins: [
      {
        requestDidStart: () => ({
          didResolveOperation({ request, document }) {
            const complexity = getComplexity({
              schema,
              operationName: request.operationName,
              query: document,
              variables: request.variables,
              estimators: [
                fieldExtensionsEstimator(),
                simpleEstimator({ defaultComplexity: 0 }),
              ],
            });

            if (complexity > 50) {
              throw new ApolloError("Query complexity was bigger than 50!");
            }
          },
        }),
      },
    ],
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
  passport.serializeUser((user: any, done) => done(null, user.id));
  passport.deserializeUser(async (id: string, done) => {
    const user = await User.findOne(id);
    done(null, user);
  });

  app.use("/api/auth", authRouter);

  apolloServer.applyMiddleware({ app, cors: false });
  app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
};

main().catch((e) => console.error(e));
