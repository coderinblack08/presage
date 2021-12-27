import {
  Body,
  Controller,
  InternalServerErrorException,
  Param,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { CurrentUser } from "src/users/users.param";
import { CreateReactionDto } from "./create-reaction.dto";
import { ReactionsService } from "./reactions.service";

@Controller("reactions")
export class ReactionsController {
  constructor(private reactionsService: ReactionsService) {}

  @Post(":id")
  @UseGuards(JwtAuthGuard)
  async react(
    @CurrentUser() userId: string,
    @Param("id") id: string,
    @Body() body: CreateReactionDto
  ) {
    try {
      await this.reactionsService.toggle(body.type, userId, id);
    } catch (error) {
      throw new InternalServerErrorException();
    }
  }
}
