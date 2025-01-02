import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { MqModule } from './mq/mq.module';
import { ConsumerModule } from './consumer/consumer.module';

@Module({
  imports: [
    BullModule.forRoot({
      connection: {
        host: 'localhost',
        port: 6379,
      },
    }),
    MqModule,
    ConsumerModule,
  ],
})
export class AppMqModule {}
