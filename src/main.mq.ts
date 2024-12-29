import { NestFactory } from '@nestjs/core';
import { AppMqModule } from './app.mq.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppMqModule);
  await app.init();
}

bootstrap();
