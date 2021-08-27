import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { FindConditions, Repository } from "typeorm";
import { Application } from "./application.entity";
import { CreateApplicationInput } from "./dto/create-application.args";
import { UpdateApplicationArgs } from "./dto/update-application.args";

@Injectable()
export class ApplicationService {
  constructor(
    @InjectRepository(Application)
    private applicationRepository: Repository<Application>
  ) {}

  async create(data: CreateApplicationInput, userId: string) {
    const application = await this.applicationRepository.findOne({
      where: { userId },
    });
    if (application) {
      return this.applicationRepository.create(data).save();
    } else {
      return (await this.update({ userId }, data)).raw;
    }
  }

  async update(
    criteria: FindConditions<Application>,
    args: UpdateApplicationArgs
  ) {
    return this.applicationRepository
      .createQueryBuilder()
      .update(Application)
      .set(args)
      .where(criteria)
      .returning("*")
      .execute();
  }
}
