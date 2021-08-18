import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { generateColor } from "@presage/common";
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
    private readonly journalRepository: Repository<Journal>
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
    if (!args.color) {
      args.color = generateColor();
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
    return this.journalRepository.softDelete(criteria);
  }
}
