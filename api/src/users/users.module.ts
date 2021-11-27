import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";
import { PrismaService } from "src/prisma.service";
import { GoogleStrategy } from "./google.strategy";
import { JwtStrategy } from "./jwt.strategy";
import { AuthController } from "./users.controller";
import { UsersService } from "./users.service";

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>("jwt.accessTokenSecret"),
        signOptions: { expiresIn: "3d" },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [GoogleStrategy, JwtStrategy, UsersService, PrismaService],
  controllers: [AuthController],
})
export class UsersModule {}
