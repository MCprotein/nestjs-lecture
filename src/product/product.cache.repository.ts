import { Injectable } from '@nestjs/common';
import { CacheService } from '../cache/cache.service';
import { IProductRepository } from './product.repository.interface';

@Injectable()
export class ProductCacheRepository implements IProductRepository {
  // private readonly store = new Map<string, any>();

  constructor(private readonly cacheService: CacheService) {}

  async createProduct(product: any) {
    product.id = product.id || String(+new Date());
    await this.cacheService.set(product.id, product);
    // this.store.set(product.id, product);
    return product;
  }

  async deleteProduct(id: string) {
    return await this.cacheService.del(id);
  }

  async findProduct(id: string) {
    return JSON.parse(await this.cacheService.get(id));
  }

  async updateProduct(id: string, product: any) {
    await this.cacheService.set(id, product);
    return product;
  }
}
