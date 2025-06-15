import { ReviewRepository } from '@interface/mongoose/review/review.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RemoveReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(id: string) {
    return this.reviewRepository.remove(id)
  }
}
