import { Module } from "@nestjs/common";
import { ApplicationService } from "./application.service";
import { ApplicationResolver } from "./application.resolver";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Application } from "./application.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Application])],
  providers: [ApplicationService, ApplicationResolver],
})
export class ApplicationModule {}
