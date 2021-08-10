import { Module } from "@nestjs/common";
import { UserModule } from "../user/user.module";
import { GoogleStrategy } from "./google.strategy";

@Module({
  imports: [UserModule],
  providers: [GoogleStrategy],
})
export class AuthModule {}
