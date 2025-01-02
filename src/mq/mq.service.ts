import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bullmq';
import { PRODUCT_QUEUE } from './mq.queue';
import { Queue } from 'bullmq';

export enum ProductJob {
  CREATE = 'create',
  UPDATE = 'update',
  DELETE = 'delete',
}

@Injectable()
export class MqService {
  constructor(
    @InjectQueue(PRODUCT_QUEUE) private readonly productQueue: Queue,
  ) {}

  async publishToProduct(jobName: ProductJob, data: any) {
    await this.productQueue.add(jobName, data);
    console.log(`${jobName} 메세지 발송했음`);
  }
}
