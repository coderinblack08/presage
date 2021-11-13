import { Test, TestingModule } from "@nestjs/testing";
import { JournalsService } from "./journals.service";

describe("JournalsService", () => {
  let service: JournalsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JournalsService],
    }).compile();

    service = module.get<JournalsService>(JournalsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
