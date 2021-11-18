import { Prisma } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from "nestjs-knex";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class JournalsService {
  constructor(
    private prisma: PrismaService,
    @InjectKnex() private readonly knex: Knex
  ) {}

  async create(data: Prisma.JournalCreateInput) {
    return this.prisma.journal.create({ data });
  }

  async update(id: string, userId: string, data: Prisma.JournalUpdateInput) {
    this.knex("journal").where({ id, userId }).update(data).returning("*");
  }

  async findAll(userId: string) {
    return this.prisma.journal.findMany({
      where: { userId },
    });
  }
}
