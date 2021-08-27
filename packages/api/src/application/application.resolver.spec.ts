import { Test, TestingModule } from "@nestjs/testing";
import { ApplicationResolver } from "./application.resolver";

describe("ApplicationResolver", () => {
  let resolver: ApplicationResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ApplicationResolver],
    }).compile();

    resolver = module.get<ApplicationResolver>(ApplicationResolver);
  });

  it("should be defined", () => {
    expect(resolver).toBeDefined();
  });
});
