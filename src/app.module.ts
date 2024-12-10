import { Module } from '@nestjs/common';
import { ProductModule } from './product/product.module';
import { MongooseModule } from '@nestjs/mongoose';
import { connection1, connection2 } from './database/database.module';

@Module({
  imports: [
    // https://docs.nestjs.com/techniques/mongodb
    MongooseModule.forRoot('mongodb://localhost:27017/lecture', {
      connectionName: connection1,
      user: 'jjangu',
      pass: 'wow',
      authSource: 'admin',
    }),
    MongooseModule.forRoot('mongodb://localhost:27018/lecture2', {
      connectionName: connection2,
      user: 'jjangu',
      pass: 'wow',
      authSource: 'admin',
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
