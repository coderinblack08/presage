import { Test, TestingModule } from "@nestjs/testing";
import { RewardsService } from "./rewards.service";

describe("RewardsService", () => {
  let service: RewardsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RewardsService],
    }).compile();

    service = module.get<RewardsService>(RewardsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
