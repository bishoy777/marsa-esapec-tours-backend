import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
async function bootstrap() {
  try {
    console.log('🚀 Starting application...');

    const app = await NestFactory.create<NestExpressApplication>(AppModule);
    console.log('✅ Nest app created');

    app.useStaticAssets('uploads', {
      prefix: '/uploads/',
    });

    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );

    const port = process.env.PORT || 3000;
    app.enableCors();

    await app.listen(port, '0.0.0.0');
    console.log(`✅ Server listening on port ${port}`);
    console.log(
      'DB_URL from env:',
      process.env.DB_URL ? '✅ Set' : '❌ NOT SET',
    );
  } catch (error) {
    console.error('❌ FATAL ERROR during startup:', error);
    process.exit(1);
  }
}
bootstrap();
