import { Types } from 'mongoose'
import { RemoveReviewUseCase } from './remove-review.usecase'
import { ReviewRepository } from '@interface/repositories/review-repository'
import { Review } from '@interface/mongoose/schemas/review.schema'

describe('RemoveReviewUseCase', () => {
  let useCase: RemoveReviewUseCase
  let repo: jest.Mocked<ReviewRepository>

  beforeEach(() => {
    repo = {
      remove: jest.fn(),
    } as unknown as jest.Mocked<ReviewRepository>
    useCase = new RemoveReviewUseCase(repo)
  })

  it('should remove a review and return the removed object', async () => {
    const productObjectId = new Types.ObjectId()
    const review = {
      _id: new Types.ObjectId(),
      productId: productObjectId,
      author: 'John',
      rating: 5,
      comment: 'Great',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    repo.remove.mockResolvedValue(review as unknown as Review)

    const result = await useCase.execute(review._id.toHexString())
    expect(result).toEqual(review)
    expect(repo.remove).toHaveBeenCalledWith(review._id.toHexString())
  })

  it('should return null if review does not exist', async () => {
    repo.remove.mockResolvedValue(null)

    const result = await useCase.execute(new Types.ObjectId().toHexString())
    expect(result).toBeNull()
  })
})
