import { Controller, Get, Param, Query } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('text')
  test() {
    return 'test';
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
}
