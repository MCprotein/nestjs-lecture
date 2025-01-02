import { Module } from '@nestjs/common';
import { BullModule } from '@nestjs/bullmq';
import { PRODUCT_QUEUE } from './mq.queue';
import { MqService } from './mq.service';

@Module({
  imports: [
    BullModule.registerQueue({
      name: PRODUCT_QUEUE,
    }),
  ],
  providers: [MqService],
  exports: [MqService],
})
export class MqModule {}
