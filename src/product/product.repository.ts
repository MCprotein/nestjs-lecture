import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product, Product2 } from './product.schema';
import { Model } from 'mongoose';
import { connection1, connection2 } from '../database/database.module';

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name, connection1)
    private readonly productModel: Model<Product>,
    @InjectModel(Product2.name, connection2)
    private readonly product2Model: Model<Product2>,
  ) {}

  async findProduct(id: string) {
    return this.productModel
      .find()
      .where(id ? { _id: id } : {})
      .lean()
      .exec();
  }

  async createProduct(product: Product) {
    return this.productModel.create(product);
  }

  async updateProduct(id: string, product: Product) {
    return this.productModel.findByIdAndUpdate(id, product, { new: true });
  }

  async deleteProduct(id: string) {
    return this.productModel.findByIdAndDelete(id);
  }

  async findProduct2(id: string) {
    return this.product2Model
      .find()
      .where(id ? { _id: id } : {})
      .lean()
      .exec();
  }

  async createProduct2(product: Product2) {
    return this.product2Model.create(product);
  }

  async updateProduct2(id: string, product: Product2) {
    return this.product2Model.findByIdAndUpdate(id, product, { new: true });
  }

  async deleteProduct2(id: string) {
    return this.product2Model.findByIdAndDelete(id);
  }
}
