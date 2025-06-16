import { ReviewRepository } from '@interface/repositories/review-repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListReviewsUseCase {
  constructor(
    @Inject('ReviewRepository')
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async execute(productId: string) {
    return this.reviewRepository.findByProduct(productId)
  }
}
