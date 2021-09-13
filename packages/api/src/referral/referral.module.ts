import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Point } from "src/reward/points.entity";
import { Referral } from "./referral.entity";
import { ReferralResolver } from "./referral.resolver";
import { ReferralService } from "./referral.service";

@Module({
  imports: [TypeOrmModule.forFeature([Referral, Point])],
  providers: [ReferralResolver, ReferralService],
})
export class ReferralModule {}
