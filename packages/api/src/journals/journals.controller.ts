import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Patch,
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

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll(@CurrentUser() userId: string) {
    return this.journalsService.findAll(userId);
  }

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

  @Patch(":id")
  @UseGuards(JwtAuthGuard)
  async update(
    @CurrentUser() userId: string,
    @Body() body: Partial<CreateJournalDto>,
    @Param("id") id: string
  ) {
    try {
      const journal = await this.journalsService.update(id, userId, body);
      return journal;
    } catch (error) {
      throw new HttpException(
        "Internal Server Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }
}
