import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindOneOptions, Repository } from "typeorm";
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
  NumberDictionary,
} from "unique-names-generator";
import { CreateUserDto } from "./dto/create-user.dto";
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

  async create(dto: CreateUserDto) {
    return this.userRepository.create(dto).save();
  }
}
