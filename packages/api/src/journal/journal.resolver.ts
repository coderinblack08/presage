import {
  HttpException,
  HttpStatus,
  ParseUUIDPipe,
  UseGuards,
} from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { CurrentUser } from "src/auth/user.param";
import { CreateJournalArgs } from "./dto/create-journal.args";
import { UpdateJournalArgs } from "./dto/update-journal.args";
import { Journal } from "./journal.entity";
import { JournalService } from "./journal.service";

@Resolver()
export class JournalResolver {
  constructor(private journalService: JournalService) {}

  @UseGuards(JwtAuthGuard)
  @Query(() => [Journal])
  async findJournals(@CurrentUser() userId: string) {
    try {
      const journals = await this.journalService.find({ where: { userId } });
      return journals;
    } catch (error) {
      throw new HttpException(
        "Internal Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Journal)
  async createJournal(
    @CurrentUser() userId: string,
    @Args() args: CreateJournalArgs
  ) {
    try {
      const journal = await this.journalService.create({ ...args, userId });
      return journal;
    } catch (error) {
      throw new HttpException(
        "Internal Error",
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Journal, { nullable: true })
  async updateJournal(
    @CurrentUser() userId: string,
    @Args("id", ParseUUIDPipe) id: string,
    @Args() args: UpdateJournalArgs
  ) {
    try {
      const journal = await this.journalService.update(
        { id, userId },
        { ...args }
      );
      return journal.raw[0];
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => Boolean)
  async deleteJournal(
    @Args("id", ParseUUIDPipe) id: string,
    @CurrentUser() userId: string
  ) {
    try {
      await this.journalService.delete({ id, userId });
      return true;
    } catch (error) {
      throw new HttpException("Forbidden", HttpStatus.FORBIDDEN);
    }
  }
}
