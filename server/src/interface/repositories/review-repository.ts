import { CreateReviewDto } from '@app/review/dtos/create-review.dto'
import { Review, ReviewDocument } from '@interface/mongoose/schemas/review.schema'
import { Types } from 'mongoose'

export interface ReviewRepository {
  create(data: CreateReviewDto): Promise<ReviewDocument>;
  findByProduct(productId: string | Types.ObjectId): Promise<Review[]>;
  findById(id: string): Promise<Review | null>;
  update(id: string, data: Partial<Review>): Promise<Review | null>;
  remove(id: string): Promise<Review | null>;
  averageRating(productId: string): Promise<number>;
}
