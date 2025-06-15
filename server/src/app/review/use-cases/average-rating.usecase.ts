import { ReviewRepository } from '@interface/mongoose/review/review.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class AverageRatingUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(productId: string): Promise<number> {
    return this.reviewRepository.averageRating(productId)
  }
}
