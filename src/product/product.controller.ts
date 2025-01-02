import { Controller, Get, Param, Query, StreamableFile } from '@nestjs/common';
import { ProductService } from './product.service';
import { MqService, ProductJob } from '../mq/mq.service';

@Controller('product')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly mqService: MqService,
  ) {}

  @Get('mq/:mode')
  async mqProduct(@Param('mode') mode: ProductJob) {
    StreamableFile;
    await this.mqService.publishToProduct(mode, {
      name: `product${new Date().toISOString()}`,
      quantity: +new Date(),
      category: 'clothes',
    });
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
}
