import { RequestHandler } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";

export const isAuth: (
  shouldThrow?: boolean
) => RequestHandler<{}, any, any, {}> =
  (shouldThrow = false) =>
  (req, _, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return next(shouldThrow && createError(401, "not authenticated"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(shouldThrow && createError(401, "not authenticated"));
    }

    try {
      const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      req.userId = payload.userId;
      return next();
    } catch {}

    return next(shouldThrow && createError(401, "not authenticated"));
  };
