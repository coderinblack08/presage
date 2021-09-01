import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Mutation, registerEnumType, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/user.param";
import { FavoriteType } from "./favorite.entity";
import { FavoriteService } from "./favorite.service";

registerEnumType(FavoriteType, { name: "FavoriteType" });

@Resolver()
export class FavoriteResolver {
  constructor(private favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async toggleFavorite(
    @Args("articleId") articleId: string,
    @Args("type", { type: () => FavoriteType, defaultValue: FavoriteType.Like })
    type: FavoriteType,
    @CurrentUser() userId: string
  ) {
    try {
      this.favoriteService.toggleFavorite(articleId, userId, type);
    } catch (error) {
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return true;
  }
}
