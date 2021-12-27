import { Test, TestingModule } from "@nestjs/testing";
import { ReactionsService } from "./reactions.service";

describe("ReactionsService", () => {
  let service: ReactionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReactionsService],
    }).compile();

    service = module.get<ReactionsService>(ReactionsService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });
});
