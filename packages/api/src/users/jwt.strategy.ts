import { ExtractJwt, Strategy } from "passport-jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Request } from "express";
import * as Cookies from "cookies";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          const cookies = new Cookies(request, null);
          const jid = cookies.get("jid", (request as any).cookie);
          return jid;
        },
      ]),
      secretOrKey: configService.get<string>("jwt.accessTokenSecret"),
      ignoreExpiration: false,
    });
  }

  async validate(payload: any) {
    return { id: payload.id };
  }
}
