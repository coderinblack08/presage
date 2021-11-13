import configuration from "./configuration";
import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./users/users.module";
import { JournalsModule } from './journals/journals.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: require("path").join(__dirname, "../.env"),
      load: [configuration],
      isGlobal: true,
    }),
    UsersModule,
    JournalsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
