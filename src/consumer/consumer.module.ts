import { Module } from '@nestjs/common';
import { MqModule } from '../mq/mq.module';
import { ProductConsumer, ProductDeadLetterConsumer } from './consumer.product';
import { BullModule } from '@nestjs/bullmq';
import { PRODUCT_DEAD_LETTER_QUEUE } from '../mq/mq.queue';

@Module({
  imports: [
    MqModule,
    BullModule.registerQueue({ name: PRODUCT_DEAD_LETTER_QUEUE }),
  ],
  providers: [ProductConsumer, ProductDeadLetterConsumer],
})
export class ConsumerModule {}
