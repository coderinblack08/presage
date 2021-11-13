import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { Profile } from "passport";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth2";
import { UsersService } from "./users.service";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(
    private config: ConfigService,
    private jwtService: JwtService,
    private userService: UsersService
  ) {
    super({
      clientID: config.get("google.clientID"),
      clientSecret: config.get("google.clientSecret"),
      callbackURL: "http://localhost:4000/auth/google/callback",
      scope: ["profile", "email"],
    } as StrategyOptions);
  }

  async validate(
    _: string,
    __: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<any> {
    try {
      const { id: googleId, displayName, emails, photos } = profile;
      const email = emails ? emails[0].value : null;
      const photo = photos ? photos[0].value : null;

      let user = await this.userService.findOne({ where: { googleId } });
      if (!user) {
        const username = this.userService.generateUsername();
        user = await this.userService.create({
          username,
          email,
          displayName,
          profilePicture: photo,
          googleId,
        });
        await this.journalService.create({
          name: "Blog",
          description: `${displayName}'s blog`,
          userId: user.id,
        });
      }
      done(null, user);
    } catch (error) {
      done(error, undefined);
    }
  }

  async login(user: any) {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}