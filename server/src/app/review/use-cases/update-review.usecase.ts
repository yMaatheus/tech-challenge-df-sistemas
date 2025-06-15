import { UpdateReviewDto } from '@app/review/dtos/update-review.dto'
import { ReviewRepository } from '@interface/mongoose/review/review.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(id: string, dto: UpdateReviewDto) {
    return this.reviewRepository.update(id, dto)
  }
}
