import { ReviewRepository } from '@interface/mongoose/review/review.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListReviewsUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(productId: string) {
    return this.reviewRepository.findByProduct(productId)
  }
}
