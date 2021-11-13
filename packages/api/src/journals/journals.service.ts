import { Prisma } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";

@Injectable()
export class JournalsService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.JournalCreateInput) {
    return this.prisma.journal.create({ data });
  }

  async findAll(userId: string) {
    return this.prisma.journal.findMany({
      where: { userId },
    });
  }
}
