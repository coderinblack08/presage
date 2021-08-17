import { Test, TestingModule } from "@nestjs/testing";
import { JournalResolver } from "./journal.resolver";

describe("JournalResolver", () => {
  let resolver: JournalResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JournalResolver],
    }).compile();

    resolver = module.get<JournalResolver>(JournalResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
