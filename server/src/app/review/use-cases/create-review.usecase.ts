import { CreateReviewDto } from '@app/review/dtos/create-review.dto'
import { ReviewRepository } from '@interface/mongoose/review/review.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class CreateReviewUseCase {
  constructor(private readonly reviewRepository: ReviewRepository) {}

  async execute(dto: CreateReviewDto) {
    return this.reviewRepository.create(dto)
  }
}
