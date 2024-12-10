import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema({ collection: 'product', versionKey: false })
export class Product {
  @Prop()
  name: string;

  @Prop()
  quantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);

@Schema({ collection: 'product2', versionKey: false })
export class Product2 {
  @Prop()
  name: string;

  @Prop()
  quantity: number;
}

export const Product2Schema = SchemaFactory.createForClass(Product2);
