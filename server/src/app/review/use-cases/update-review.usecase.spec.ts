import { Types } from 'mongoose'
import { UpdateReviewUseCase } from './update-review.usecase'
import { ReviewRepository } from '@interface/repositories/review-repository'
import { UpdateReviewDto } from '../dtos/update-review.dto'
import { Review } from '@interface/mongoose/schemas/review.schema'

describe('UpdateReviewUseCase', () => {
  let useCase: UpdateReviewUseCase
  let repo: jest.Mocked<ReviewRepository>

  beforeEach(() => {
    repo = {
      update: jest.fn(),
    } as unknown as jest.Mocked<ReviewRepository>
    useCase = new UpdateReviewUseCase(repo)
  })

  it('should update a review and return the updated object', async () => {
    const productObjectId = new Types.ObjectId()
    const reviewId = new Types.ObjectId()
    const dto: UpdateReviewDto = { rating: 4, comment: 'Updated comment' }
    const updated = {
      _id: reviewId,
      productId: productObjectId,
      author: 'Jane',
      rating: 4,
      comment: 'Updated comment',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    repo.update.mockResolvedValue(updated as unknown as Review)

    const result = await useCase.execute(reviewId.toHexString(), dto)
    expect(result).toEqual(updated)
    expect(repo.update).toHaveBeenCalledWith(reviewId.toHexString(), dto)
  })

  it('should return null if review does not exist', async () => {
    const reviewId = new Types.ObjectId()
    repo.update.mockResolvedValue(null)

    const result = await useCase.execute(reviewId.toHexString(), { rating: 2 })
    expect(result).toBeNull()
  })
})
