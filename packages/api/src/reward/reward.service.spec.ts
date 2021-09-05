import { Test, TestingModule } from "@nestjs/testing";
import { RewardService } from "./reward.service";

describe("RewardService", () => {
  let service: RewardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardService],
    }).compile();

    service = module.get<RewardService>(RewardService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
