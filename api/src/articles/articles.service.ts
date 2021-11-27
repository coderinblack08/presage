import { Injectable } from "@nestjs/common";
import { InjectKnex, Knex } from "nestjs-knex";
import { PrismaService } from "src/prisma.service";
import { UpdateArticleDto } from "./update-article.dto";

@Injectable()
export class ArticlesService {
  constructor(
    private prisma: PrismaService,
    @InjectKnex() private readonly knex: Knex
  ) {}

  async create(userId: string) {
    return this.prisma.article.create({
      data: {
        title: "Untitled",
        isPublished: false,
        likeCount: 0,
        bookmarkCount: 0,
        shareCount: 0,
        user: { connect: { id: userId } },
      },
    });
  }

  async findDrafts(userId: string) {
    return this.prisma.article.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
  }

  async findOne(id: string, userId: string) {
    const article = await this.prisma.article.findFirst({
      where: { id },
    });
    if (article.userId !== userId) {
      throw new Error("Not Authorized");
    }
    return article;
  }

  async update(id: string, userId: string, data: UpdateArticleDto) {
    return (
      await this.knex("Article")
        .where({ id, userId })
        .update(data)
        .returning("*")
    )[0];
  }
}
