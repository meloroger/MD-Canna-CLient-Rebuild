import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { static as Estatic } from 'express';
import { join } from 'path';
import { log } from 'console';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  log('!!!bootstrap!!!');
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors();
  app.useStaticAssets(join(__dirname, '..', 'client-build'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('hbs');
  await app.listen(process.env.PORT || 3000);
  log('Server Started....');
}
bootstrap();
