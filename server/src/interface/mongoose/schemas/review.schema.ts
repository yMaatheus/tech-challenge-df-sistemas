import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import { Document, Types } from 'mongoose'

@Schema({ timestamps: true })
export class Review extends Document {
  @Prop({ type: Types.ObjectId, ref: 'Product', required: true })
  productId: Types.ObjectId

  @Prop({ required: true })
  author: string

  @Prop({ required: true, min: 1, max: 5 })
  rating: number

  @Prop()
  comment: string
}

export const ReviewSchema = SchemaFactory.createForClass(Review)
