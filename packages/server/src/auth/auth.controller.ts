import { Controller, Get, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CookieOptions, Request, Response } from "express";
import { User } from "../user/user.entity";
import { GoogleStrategy } from "./google.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Public } from "./public.decorator";

@Controller("auth")
export class AuthController {
  constructor(private googleStrategy: GoogleStrategy) {}

  options: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    domain:
      process.env.NODE_ENV === "production" ? ".joinpresage.com" : undefined,
  };

  @Public()
  @UseGuards(JwtAuthGuard)
  @Get("me")
  async test(@Req() req: Request) {
    console.log({ user: req.user });
    return req.user ? User.findOne(req.user?.id) : null;
  }

  @UseGuards(AuthGuard("google"))
  @Get("/google")
  async googleAuth(@Req() req: Request) {
    return req.user;
  }

  @UseGuards(AuthGuard("google"))
  @Get("google/callback")
  @Redirect()
  async googleLoginCallback(
    @Req() req: Request,
    @Res({ passthrough: true }) res: Response
  ) {
    const { accessToken } = await this.googleStrategy.login(req.user);
    res.cookie("jid", accessToken, this.options);
    return { url: `http://localhost:3000` };
  }
}
