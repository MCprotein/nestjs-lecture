import { InjectQueue, Processor, WorkerHost } from '@nestjs/bullmq';
import { PRODUCT_DEAD_LETTER_QUEUE, PRODUCT_QUEUE } from '../mq/mq.queue';
import { Job, Queue } from 'bullmq';

function 어떤작업(name, data) {
  throw new Error('어떤작업 실패');
  console.log(name, data);
}

@Processor(PRODUCT_QUEUE)
export class ProductConsumer extends WorkerHost {
  constructor(
    @InjectQueue(PRODUCT_DEAD_LETTER_QUEUE)
    private readonly deadLetterQueue: Queue,
  ) {
    super();
  }

  async process(job: Job): Promise<any | void> {
    try {
      어떤작업(job.name, job.data);
    } catch (err) {
      await this.deadLetterQueue.add(
        'failed',
        {
          name: job.name,
          data: job.data,
          error: err.message,
        },
        {
          attempts: 3,
        },
      );
    }
  }
}

@Processor(PRODUCT_DEAD_LETTER_QUEUE)
export class ProductDeadLetterConsumer extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job): Promise<any | void> {
    console.log('dead letter', job.name, job.data);
  }
}
