import { IProductRepository } from './product.repository.interface';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../database/prisma.service';

@Injectable()
export class ProductPostgresqlRepository implements IProductRepository {
  constructor(private readonly prismService: PrismaService) {}

  async findMany({
    take = 1,
    skip,
    cursorId,
  }: {
    take: number;
    skip: number;
    cursorId: number;
  }) {
    return this.prismService.example.findMany({
      take,
      skip,
      cursor: {
        id: cursorId,
      },
    });
  }

  findProduct(id: string) {
    throw new Error('Method not implemented.');
  }
  createProduct(product: any) {
    throw new Error('Method not implemented.');
  }
  updateProduct(id: string, product: any) {
    throw new Error('Method not implemented.');
  }
  deleteProduct(id: string) {
    throw new Error('Method not implemented.');
  }
}
