import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
  UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "src/users/jwt-auth.guard";
import { CurrentUser } from "src/users/users.param";
import { CreateJournalDto } from "./create-journal.dto";
import { JournalsService } from "./journals.service";

@Controller("journals")
export class JournalsController {
  constructor(private journalsService: JournalsService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(@CurrentUser() userId: string, @Body() body: CreateJournalDto) {
    try {
      const journal = await this.journalsService.create({
        user: { connect: { id: userId } },
        ...body,
      });
      return journal;
    } catch (error) {
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
