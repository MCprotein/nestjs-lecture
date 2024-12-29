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
  constructor(@InjectQueue(PRODUCT_QUEUE) private productQueue: Queue) {}

  async publishToProduct(job: ProductJob, data: any) {
    await this.productQueue.add(job, data);
  }
}
