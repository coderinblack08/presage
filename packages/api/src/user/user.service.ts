import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { DeepPartial, FindOneOptions, Repository } from "typeorm";
import {
  adjectives,
  animals,
  colors,
  NumberDictionary,
  uniqueNamesGenerator,
} from "unique-names-generator";
import { User } from "./user.entity";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async findOne(options: FindOneOptions<User>) {
    return this.userRepository.findOne(options);
  }

  generateUsername() {
    return uniqueNamesGenerator({
      dictionaries: [
        adjectives,
        colors,
        animals,
        NumberDictionary.generate({ min: 10, max: 99 }),
      ],
      separator: "-",
    });
  }

  async create(data: DeepPartial<User>) {
    return this.userRepository.create(data).save();
  }
}
