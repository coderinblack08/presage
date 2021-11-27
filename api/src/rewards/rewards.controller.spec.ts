import { Test, TestingModule } from "@nestjs/testing";
import { RewardsController } from "./rewards.controller";

describe("RewardsController", () => {
  let controller: RewardsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RewardsController],
    }).compile();

    controller = module.get<RewardsController>(RewardsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
