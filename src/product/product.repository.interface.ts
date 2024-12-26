export interface IProductRepository {
  findProduct(id: string): any;
  createProduct(product: any): any;
  updateProduct(id: string, product: any): any;
  deleteProduct(id: string): any;
}
