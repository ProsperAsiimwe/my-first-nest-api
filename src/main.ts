import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ValidationPipe is a built-in pipe by Nestjs to allow validations
  // We override the ValidationPipe variable whitelist: true, to filter out any unwanted payload not defined in our DTOs
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(3030);
}
bootstrap();
