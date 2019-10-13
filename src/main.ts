import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { static as Estatic } from 'express';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(Estatic(join(__dirname, '../client-build')));
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
