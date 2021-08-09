import { RequestHandler } from "express";
import jwt from "jsonwebtoken";

export const isAuth: (
  shouldThrow?: boolean
) => RequestHandler<{}, any, any, {}> =
  (shouldThrow = false) =>
  (req, res, next) => {
    const token = req.cookies.jid;

    if (!token) {
      if (shouldThrow) {
        return res.status(401).json({ message: "Not authenticated" });
      } else {
        return next();
      }
    }

    try {
      const payload: any = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!);
      req.userId = payload.userId;
      return next();
    } catch {}

    if (shouldThrow) {
      return res.status(401).json({ message: "Not authenticated" });
    } else {
      return next();
    }
  };
