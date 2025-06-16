import { ReviewRepository } from '@interface/repositories/review-repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class AverageRatingUseCase {
  constructor(
    @Inject('ReviewRepository')
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async execute(productId: string): Promise<number> {
    return this.reviewRepository.averageRating(productId)
  }
}
