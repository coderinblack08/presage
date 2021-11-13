import { Test, TestingModule } from "@nestjs/testing";
import { JournalsController } from "./journals.controller";

describe("JournalsController", () => {
  let controller: JournalsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [JournalsController],
    }).compile();

    controller = module.get<JournalsController>(JournalsController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
