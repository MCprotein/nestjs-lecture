import { Module } from '@nestjs/common';
import { ProductConsumer } from './product/product.controller';
import { BullModule } from '@nestjs/bullmq';
import { MqModule } from './mq/mq.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MqModule,
  ],
  providers: [ProductConsumer],
})
export class AppMqModule {}
