import { Injectable } from "@nestjs/common";
import { generateRandomEmoji } from "@presage/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Article } from "src/article/article.entity";
import {
  FindConditions,
  FindManyOptions,
  FindOneOptions,
  Repository,
} from "typeorm";
import { CreateJournalArgs } from "./dto/create-journal.args";
import { UpdateJournalArgs } from "./dto/update-journal.args";
import { Journal } from "./journal.entity";

@Injectable()
export class JournalService {
  constructor(
    @InjectRepository(Journal)
    private readonly journalRepository: Repository<Journal>,
    @InjectRepository(Journal)
    private readonly articleRepository: Repository<Article>
  ) {}

  sortOptions = {
    order: {
      createdAt: "DESC",
      updatedAt: "DESC",
    },
  } as FindOneOptions<Journal> | FindManyOptions<Journal>;

  async findOne(id: string) {
    return this.journalRepository.findOne(id);
  }

  async find(criteria: FindManyOptions<Journal>) {
    return this.journalRepository.find({
      ...criteria,
      ...this.sortOptions,
    });
  }

  async create(args: CreateJournalArgs) {
    if (!args.emoji) {
      args.emoji = generateRandomEmoji();
    }
    return this.journalRepository.create(args).save();
  }

  async update(criteria: FindConditions<Journal>, args: UpdateJournalArgs) {
    return this.journalRepository
      .createQueryBuilder()
      .update(Journal)
      .set(args)
      .where(criteria)
      .returning("*")
      .execute();
  }

  async delete(criteria: FindConditions<Journal>) {
    const journal = await this.journalRepository.findOne(criteria, {
      relations: ["article"],
    }); // should remove articles
    if (journal) {
      journal.softRemove();
    }
  }
}
