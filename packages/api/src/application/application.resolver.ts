import { UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/user.param";
import { Application } from "./application.entity";
import { ApplicationService } from "./application.service";
import { CreateApplicationInput } from "./dto/create-application.args";

@Resolver()
export class ApplicationResolver {
  constructor(private applicationService: ApplicationService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Application)
  async createApplication(
    @CurrentUser() userId: string,
    @Args("data") args: CreateApplicationInput
  ): Promise<Application> {
    return this.applicationService.create(args, userId);
  }
}
