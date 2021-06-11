import { verify } from "jsonwebtoken";
import { NextFunction, Request, RequestHandler, Response } from "express";
import createError from "http-errors";
import { User } from "../entity/User";
import {
  AccessTokenData,
  RefreshTokenData,
  createTokens,
} from "../modules/auth/createTokens";

export const isAuth: (st?: boolean) => RequestHandler<{}, any, any, {}> =
  (shouldThrow = true) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    const accessToken = req.headers["access-token"];
    if (!accessToken || typeof accessToken !== "string")
      return next(shouldThrow && createError(401, "not authenticated"));
    try {
      const data = <AccessTokenData>(
        verify(accessToken, process.env.ACCESS_TOKEN_SECRET!)
      );
      req.userId = data.userId;
      return next();
    } catch {}

    const refreshToken = req.headers["refresh-token"];
    if (!refreshToken || typeof refreshToken !== "string")
      return next(shouldThrow && createError(401, "not authenticated"));

    let data;
    try {
      data = <RefreshTokenData>(
        verify(refreshToken, process.env.REFRESH_TOKEN_SECRET!)
      );
    } catch {
      return next(shouldThrow && createError(401, "not authenticated"));
    }

    const user = await User.findOne(data.userId);
    if (!user || user.tokenVersion !== data.tokenVersion) {
      return next(shouldThrow && createError(401, "not authenticated"));
    }

    const tokens = createTokens(user);
    res.setHeader("refresh-token", tokens.refreshToken);
    res.setHeader("access-token", tokens.accessToken);
    req.userId = data.userId;

    next();
  };
