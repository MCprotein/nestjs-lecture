import { Inject, Injectable } from '@nestjs/common';
import { IProductRepository } from './product.repository.interface';
import { ProductCacheRepository } from './product.cache.repository';
import { ProductPostgresqlRepository } from './product.postgresql.repository';
import { ProductRepository } from './product.repository';
import { Cursor } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductCacheRepository)
    private readonly productRepository: IProductRepository,
    @Inject(ProductRepository)
    private readonly productMongoRepository: IProductRepository,
  ) {}

  async findManyStream() {
    const stream: Cursor = await this.productMongoRepository
      .findMany()
      .cursor();
    // const products = await stream.toArray();
    // return products;

    return stream;
  }

  async findMany() {
    const products = await this.productMongoRepository.findMany().exec();
    return products;
  }

  async findProduct(id: string) {
    const result1 = await this.productRepository.findProduct(id);
    // const result2 = await this.productRepository.findProduct2(id);
    return { result1 };
  }

  async createProduct(product) {
    const result1 = await this.productRepository.createProduct(product);
    // const result2 = await this.productRepository.createProduct2(product);
    return { result1 };
  }

  async updateProduct(id, product) {
    const result1 = await this.productRepository.updateProduct(id, product);
    // const result2 = await this.productRepository.updateProduct2(id, product);
    return { result1 };
  }

  async deleteProduct(id) {
    const result1 = await this.productRepository.deleteProduct(id);
    // const result2 = await this.productRepository.deleteProduct2(id);
    return { result1 };
  }
}
