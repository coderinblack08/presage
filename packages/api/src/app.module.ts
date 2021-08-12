import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import * as connectionOptions from "./ormconfig";
import { UserModule } from "./user/user.module";
import configuration from "./config/configuration";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, "../.env"),
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
