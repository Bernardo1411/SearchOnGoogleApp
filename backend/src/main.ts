import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();

  app.use((req, res, next) => {
    next();
  });

  await app.listen(5001);
}

bootstrap();
