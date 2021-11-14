import { Prisma } from ".prisma/client";
import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma.service";
import {
  adjectives,
  animals,
  NumberDictionary,
  uniqueNamesGenerator,
} from "unique-names-generator";

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  public generateUsername() {
    return uniqueNamesGenerator({
      dictionaries: [
        adjectives,
        animals,
        NumberDictionary.generate({ min: 1000, max: 9999 }),
      ],
      separator: "-",
    });
  }

  async findOne(params: {
    where?: Prisma.UserWhereInput;
    select?: Prisma.UserSelect;
  }) {
    params.select ||= {
      id: true,
      bio: true,
      createdAt: true,
      displayName: true,
      profilePicture: true,
      username: true,
    };
    return this.prisma.user.findFirst(params);
  }

  async create(data: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: {
        username: this.generateUsername(),
        ...data,
      },
    });
  }
}
