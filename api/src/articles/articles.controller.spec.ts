import { Test, TestingModule } from "@nestjs/testing";
import { ArticlesController } from "./articles.controller";

describe("ArticlesController", () => {
  let controller: ArticlesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ArticlesController],
    }).compile();

    controller = module.get<ArticlesController>(ArticlesController);
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
  });
});
