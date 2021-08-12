import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { PassportStrategy } from "@nestjs/passport";
import { ConfigService } from "@nestjs/config";
import { Profile } from "passport";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth2";
import { User } from "../user/user.entity";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private config: ConfigService, private jwtService: JwtService) {
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
    const { id: googleId, displayName, emails, photos } = profile;
    const email = emails ? emails[0].value : null;
    const photo = photos ? photos[0].value : null;

    let user = await User.findOne({ where: { googleId } });
    if (!user) {
      user = User.create({
        email,
        username: "",
        profilePicture: photo,
        displayName,
        googleId,
      });
      await user.save();
    }
    console.log(user);
    done(null, user);
  }

  async login(user: any) {
    const payload = { id: user.id };
    return {
      accessToken: this.jwtService.sign(payload),
    };
  }
}
