import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { Processor, WorkerHost } from '@nestjs/bullmq';
import { PRODUCT_QUEUE } from '../mq/mq.queue';
import { MqService, ProductJob } from '../mq/mq.service';
import { Job } from 'bullmq';

function getMemoryUsageInMB() {
  const memoryUsage = process.memoryUsage();
  const memoryUsageInMB = {};

  for (const key in memoryUsage) {
    memoryUsageInMB[key] = (memoryUsage[key] / (1024 * 1024)).toFixed(2); // MB로 변환 후 소수점 2자리
  }

  return memoryUsageInMB;
}

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly mqService: MqService,
  ) {}

  @Get('many/stream')
  async test() {
    console.time('findManyStream');
    const stream = await this.productService.findManyStream();
    const result = await stream.toArray();
    // await stream.close();
    console.timeEnd('findManyStream');
    console.log(result.length);
    console.log(getMemoryUsageInMB());

    return 'ok';
  }

  @Get('many')
  async test3() {
    console.time('findMany');
    const result = await this.productService.findMany();
    console.timeEnd('findMany');
    console.log(result.length);
    console.log(getMemoryUsageInMB());
    return 'ok';
  }

  @Get('json')
  test2() {
    return { test: 'test' };
  }

  @Get('find')
  async findProduct(@Query('id') id: string) {
    return this.productService.findProduct(id);
  }

  @Get('create')
  async createProduct() {
    return this.productService.createProduct({
      name: 'product',
      quantity: +new Date(),
    });
  }

  @Get('update/:id')
  async updateProduct(@Param('id') id: string) {
    return this.productService.updateProduct(id, {
      name: 'product',
      quantity: +new Date(),
    });
  }

  @Get('delete/:id')
  async deleteProduct(@Param('id') id: string) {
    return this.productService.deleteProduct(id);
  }

  @Get('pub/:mode')
  async pub(@Param('mode') mode: ProductJob) {
    await this.mqService.publishToProduct(mode, {
      name: 'product',
      quantity: +new Date(),
    });
    return 'published';
  }
}

@Processor(PRODUCT_QUEUE)
export class ProductConsumer extends WorkerHost {
  constructor() {
    super();
  }

  async process(job: Job): Promise<any | void> {
    console.log(job.name, job.data);
  }
}
