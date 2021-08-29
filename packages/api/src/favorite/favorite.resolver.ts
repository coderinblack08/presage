import { HttpException, HttpStatus, UseGuards } from "@nestjs/common";
import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/user.param";
import { FavoriteService } from "./favorite.service";

@Resolver()
export class FavoriteResolver {
  constructor(private favoriteService: FavoriteService) {}

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async toggleFavorite(
    @Args("articleId") articleId: string,
    @CurrentUser() userId: string
  ) {
    try {
      this.favoriteService.toggleFavorite(articleId, userId);
    } catch (error) {
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
    return true;
  }
}
