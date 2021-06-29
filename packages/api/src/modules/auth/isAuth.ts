import { RequestHandler } from "express";
import createError from "http-errors";
import jwt from "jsonwebtoken";

export const isAuth: (
  shouldThrow?: boolean
) => RequestHandler<{}, any, any, {}> =
  (shouldThrow = false) =>
  (req, _, next) => {
    const authHeader = req.headers.authorization;
    const code = new createError.Unauthorized();
    if (!authHeader) {
      return next(shouldThrow && createError(code, "not authenticated"));
    }

    const token = authHeader.split(" ")[1];
    if (!token) {
      return next(shouldThrow && createError(code, "not authenticated"));
    }

    try {
      const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      req.userId = payload.userId;
      return next();
    } catch {}

    return next(shouldThrow && createError(code, "not authenticated"));
  };
