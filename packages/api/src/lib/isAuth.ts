import { NextFunction, Request, Response } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
  if (!req.userId) throw new Error("Not authorized");
  next();
};
