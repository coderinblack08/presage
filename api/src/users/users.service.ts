import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOneOptions, Repository } from "typeorm";
import {
  adjectives,
  animals,
  NumberDictionary,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { User } from "./user.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>
  ) {}

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

  async findOne(params: FindOneOptions) {
    return this.usersRepository.findOne(params);
  }

  async create(data: DeepPartial<User>) {
    return this.usersRepository
      .create({
        username: this.generateUsername(),
        ...data,
      })
      .save();
  }
}
