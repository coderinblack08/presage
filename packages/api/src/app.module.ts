import configuration from "./configuration";
import { KnexModule } from "nestjs-knex";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { JournalsModule } from "./journals/journals.module";

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
    JournalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
