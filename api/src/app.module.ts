import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { KnexModule } from "nestjs-knex";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import configuration from "./configuration";
import { UsersModule } from "./users/users.module";
import { ArticlesModule } from './articles/articles.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: require("path").join(__dirname, "../.env"),
      load: [configuration],
      isGlobal: true,
    }),
    KnexModule.forRoot({
      config: {
        client: "pg",
        connection: process.env.DATABASE_URL,
      },
    }),
    UsersModule,
    ArticlesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
