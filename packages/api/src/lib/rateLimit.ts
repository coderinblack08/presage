import rateLimit from "express-rate-limit";
import { NextFunction } from "express-serve-static-core";
import RedisStore from "rate-limit-redis";
import { isDev, SECONDS_IN_HOUR } from "./constants";
import { redis } from "./redis";

export const limiter = (options: Partial<rateLimit.Options>) =>
  isDev()
    ? (_: any, __: any, next: NextFunction) => next()
    : rateLimit({
        store: new RedisStore({
          client: redis,
          expiry: options.windowMs || 100,
        }),
        windowMs: SECONDS_IN_HOUR,
        max: 100,
        ...options,
      });
