import { Resolver, Query } from "@nestjs/graphql";
import { UserId } from "src/auth/user.param";
import { User } from "./user.entity";
import { UserService } from "./user.service";

@Resolver(() => User)
export class UserResolver {
  constructor(private userService: UserService) {}

  @Query(() => User, { nullable: true })
  async me(@UserId() userId: string) {
    return userId ? this.userService.findOne({ where: { id: userId } }) : null;
  }
}
