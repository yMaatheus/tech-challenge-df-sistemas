import { AverageRatingUseCase } from '@app/review/use-cases/average-rating.usecase'
import { CreateReviewUseCase } from '@app/review/use-cases/create-review.usecase'
import { ListReviewsUseCase } from '@app/review/use-cases/list-reviews.usecase'
import { RemoveReviewUseCase } from '@app/review/use-cases/remove-review.usecase'
import { UpdateReviewUseCase } from '@app/review/use-cases/update-review.usecase'
import { ReviewRepository } from '@interface/mongoose/review/review.repository'
import { Review, ReviewSchema } from '@interface/mongoose/schemas/review.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Review.name, schema: ReviewSchema }]),
  ],
  providers: [
    ReviewRepository,
    CreateReviewUseCase,
    UpdateReviewUseCase,
    ListReviewsUseCase,
    RemoveReviewUseCase,
    AverageRatingUseCase,
  ],
  exports: [
    ReviewRepository,
    CreateReviewUseCase,
    UpdateReviewUseCase,
    ListReviewsUseCase,
    RemoveReviewUseCase,
    AverageRatingUseCase,
  ],
})
export class ReviewModule {}
