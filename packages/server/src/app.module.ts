import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "nestjs-config";
import path from "path";
import { getConnectionOptions } from "typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.load(
      path.resolve(__dirname, "config", "**/!(*.d).config.{ts,js}"),
      {
        modifyConfigName: (name) => name.replace(".config", ""),
      }
    ),
    TypeOrmModule.forRootAsync({
      useFactory: async () => {
        const options = await getConnectionOptions(process.env.NODE_ENV);
        return options;
      },
    }),
    AuthModule,
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
