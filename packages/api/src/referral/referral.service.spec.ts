import { Test, TestingModule } from "@nestjs/testing";
import { ReferralService } from "./referral.service";

describe("ReferralService", () => {
  let service: ReferralService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReferralService],
    }).compile();

    service = module.get<ReferralService>(ReferralService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
