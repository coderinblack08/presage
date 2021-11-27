import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { PrismaService } from "./prisma.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: "http://localhost:3000",
      credentials: true,
    },
  });
  app.useGlobalPipes(new ValidationPipe({}));
  await app.listen(4000);
  const prismaService: PrismaService = app.get(PrismaService);
  prismaService.enableShutdownHooks(app);
}
bootstrap();
