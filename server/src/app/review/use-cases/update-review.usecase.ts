import { UpdateReviewDto } from '@app/review/dtos/update-review.dto'
import { ReviewRepository } from '@interface/repositories/review-repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateReviewUseCase {
  constructor(
    @Inject('ReviewRepository')
    private readonly reviewRepository: ReviewRepository,
  ) {}

  async execute(id: string, dto: UpdateReviewDto) {
    return this.reviewRepository.update(id, dto)
  }
}
