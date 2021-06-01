import { Request, Response } from "express";
import { Redis } from "ioredis";
import { User } from "../entities/User";
import { createUpvoteLoader } from "../lib/upvoteLoader";

export type Context = {
  redis: Redis;
  // @ts-ignore
  req: Request & { session: Express.Session; user: User };
  upvoteLoader: ReturnType<typeof createUpvoteLoader>;
  res: Response;
};
