import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ArticlesModule } from "./articles/articles.module";
import configuration from "./configuration";
import * as connectionOptions from "./ormconfig";
import { UsersModule } from "./users/users.module";
import { RewardsModule } from './rewards/rewards.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: require("path").join(__dirname, "../.env"),
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(connectionOptions),
    UsersModule,
    ArticlesModule,
    RewardsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
