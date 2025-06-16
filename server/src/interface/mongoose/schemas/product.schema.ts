import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class Product extends Document {
  @Prop({ required: true })
  name: string

  @Prop()
  description: string

  @Prop({ required: true })
  price: number

  @Prop({ required: true })
  category: string
}

export type ProductDocument = Product & Document & { _id: Types.ObjectId }

export const ProductSchema = SchemaFactory.createForClass(Product)
