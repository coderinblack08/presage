import { Request, Response } from "express";
import { Redis } from "ioredis";
import { User } from "../entities/User";

export type Context = {
  redis: Redis;
  // @ts-ignore
  req: Request & { session: Express.Session; user: User };
  res: Response;
};
