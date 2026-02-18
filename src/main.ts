import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets('uploads', {
    prefix: '/uploads/',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // removes unknown fields
      forbidNonWhitelisted: true, // throws error on extra fields
      transform: true, // auto-transform types
    }),
  );
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
