import { Module } from "@nestjs/common";
import { FavoriteResolver } from "./favorite.resolver";
import { FavoriteService } from "./favorite.service";

@Module({
  providers: [FavoriteResolver, FavoriteService],
  exports: [FavoriteService],
})
export class FavoriteModule {}
