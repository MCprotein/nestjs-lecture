import { Cursor, Query } from 'mongoose';

export interface IProductRepository {
  findProduct(id: string): any;
  createProduct(product: any): any;
  updateProduct(id: string, product: any): any;
  deleteProduct(id: string): any;
  findMany({
    take,
    skip,
    cursorId,
  }?: {
    take: number;
    skip: number;
    cursorId: number;
  }): any | Cursor | Query<any, any>;
}
