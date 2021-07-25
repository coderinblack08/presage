import rateLimit from "express-rate-limit";
import RedisStore from "rate-limit-redis";
import { SECONDS_IN_HOUR } from "./constants";
import { redis } from "./redis";

export const limiter = (options: Partial<rateLimit.Options>) =>
  rateLimit({
    store: new RedisStore({
      client: redis,
      expiry: options.windowMs || 100,
    }),
    windowMs: SECONDS_IN_HOUR,
    max: 100,
    ...options,
  });
