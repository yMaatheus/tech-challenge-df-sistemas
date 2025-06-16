import { ReviewRepository } from '@interface/repositories/review-repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class RemoveReviewUseCase {
  constructor(
    @Inject('ReviewRepository')
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async execute(id: string) {
    return this.reviewRepository.remove(id)
  }
}
