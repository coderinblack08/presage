import { UseGuards } from "@nestjs/common";
import { Context, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { Public } from "src/auth/public.decorator";
import { CurrentUser } from "src/auth/user.param";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Public()
  @UseGuards(JwtAuthGuard)
  @Query(() => User, { nullable: true })
  async me(@CurrentUser() userId: string, @Context() context: any) {
    console.log(userId, context.req.user);
    return userId ? this.userService.findOne({ where: { id: userId } }) : null;
  }
}
