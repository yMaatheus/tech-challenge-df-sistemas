import { CreateReviewDto } from '@app/review/dtos/create-review.dto'
import { ReviewRepository } from '@interface/repositories/review-repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateReviewUseCase {
  constructor(
    @Inject('ReviewRepository')
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async execute(dto: CreateReviewDto) {
    return this.reviewRepository.create(dto)
  }
}
