import { Controller, Get, Redirect, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { CookieOptions, Request, Response } from "express";
import { GoogleStrategy } from "./google.strategy";
import { JwtAuthGuard } from "./jwt-auth.guard";
import { Public } from "./users.decorator";
import { CurrentUser } from "./users.param";
import { UsersService } from "./users.service";

@Controller("auth")
export class AuthController {
  constructor(
    private googleStrategy: GoogleStrategy,
    private userService: UsersService
  ) {}

  options: CookieOptions = {
    httpOnly: true,
    sameSite: "lax",
    domain:
      process.env.NODE_ENV === "production" ? ".joinpresage.com" : undefined,
  };

  @UseGuards(AuthGuard("google"))
  @Get("google")
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
    return { url: "http://localhost:3000" };
  }

  @Public()
  @UseGuards(JwtAuthGuard)
  @Get("me")
  async me(@CurrentUser() userId: string) {
    return userId ? this.userService.findOne({ where: { id: userId } }) : null;
  }
}
