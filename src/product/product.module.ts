import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Product,
  Product2,
  Product2Schema,
  ProductSchema,
} from './product.schema';
import {
  connection1,
  connection2,
  DatabaseModule,
} from '../database/database.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { CacheModule } from '../cache/cache.module';
import { ProductCacheRepository } from './product.cache.repository';
import { MqModule } from '../mq/mq.module';
import { ProductPostgresqlRepository } from './product.postgresql.repository';

@Module({
  imports: [
    MongooseModule.forFeature(
      [
        {
          name: Product.name,
          schema: ProductSchema,
        },
      ],
      connection1,
    ),
    MongooseModule.forFeature(
      [
        {
          name: Product2.name,
          schema: Product2Schema,
        },
      ],
      connection2,
    ),
    MqModule,
    CacheModule,
    DatabaseModule,
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository,
    ProductCacheRepository,
    ProductPostgresqlRepository,
  ],
})
export class ProductModule {}
