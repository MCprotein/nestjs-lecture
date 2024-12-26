import { Inject, Injectable } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { IProductRepository } from './product.repository.interface';
import { ProductCacheRepository } from './product.cache.repository';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProductCacheRepository)
    private readonly productRepository: IProductRepository,
  ) {}

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
