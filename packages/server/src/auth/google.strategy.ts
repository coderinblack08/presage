import { PassportStrategy } from "@nestjs/passport";
import { Injectable } from "@nestjs/common";
import {
  Strategy,
  StrategyOptions,
  VerifyCallback,
} from "passport-google-oauth2";
import { Profile } from "passport";
import { ConfigService } from "nestjs-config";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, "google") {
  constructor(private readonly config: ConfigService) {
    super({
      clientID: config.get("auth.clientID"),
      clientSecret: config.get("auth.clientSecret"),
      callbackURL: "http://localhost:4000/auth/google/callback",
      scope: [
        "https://www.googleapis.com/auth/userinfo.profile",
        "https://www.googleapis.com/auth/userinfo.email",
      ],
    } as StrategyOptions);
  }
  async validate(
    accessToken: string,
    _: string,
    profile: Profile,
    done: VerifyCallback
  ): Promise<any> {
    const { name, emails, photos } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
      picture: photos[0].value,
      accessToken,
    };
    console.log(user);
    done(null, user);
  }
}
