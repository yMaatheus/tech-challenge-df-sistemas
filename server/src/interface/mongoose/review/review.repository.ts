import { CreateReviewDto } from '@app/review/dtos/create-review.dto'
import { Review } from '@interface/mongoose/schemas/review.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model, Types } from 'mongoose'

@Injectable()
export class ReviewRepository {
  constructor(
    @InjectModel(Review.name)
    private readonly reviewModel: Model<Review>,
  ) {}

  async create(data: CreateReviewDto): Promise<Review> {
    return this.reviewModel.create(data)
  }

  async findByProduct(productId: string): Promise<Review[]> {
    return this.reviewModel.find({ productId: new Types.ObjectId(productId) }).exec()
  }

  async findById(id: string): Promise<Review | null> {
    return this.reviewModel.findById(id).exec()
  }

  async update(id: string, data: Partial<Review>): Promise<Review | null> {
    return this.reviewModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async remove(id: string): Promise<Review | null> {
    return this.reviewModel.findByIdAndDelete(id).exec()
  }

  async averageRating(productId: string): Promise<number> {
    const result = await this.reviewModel.aggregate([
      { $match: { productId: new Types.ObjectId(productId) } },
      { $group: { _id: '$productId', average: { $avg: '$rating' } } },
    ])
    return result[0]?.average ?? 0
  }
}
