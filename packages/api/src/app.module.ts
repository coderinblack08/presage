import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { TypeOrmModule } from "@nestjs/typeorm";
import path from "path";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import configuration from "./config/configuration";
import * as connectionOptions from "./ormconfig";
import { UserModule } from "./user/user.module";
import { JournalModule } from "./journal/journal.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: path.join(__dirname, "../.env"),
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    GraphQLModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          debug: configService.get("isDev"),
          playground: configService.get("isDev")
            ? {
                settings: {
                  "request.credentials": "include",
                },
              }
            : false,
          autoSchemaFile: true,
          cors: { credentials: true, origin: "http://localhost:3000" },
          include: [UserModule, JournalModule],
          context: ({ req, res }) => ({ req, res }),
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UserModule,
    JournalModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
