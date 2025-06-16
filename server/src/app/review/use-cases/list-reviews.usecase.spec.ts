import { ReviewRepository } from '@interface/repositories/review-repository'
import { ListReviewsUseCase } from './list-reviews.usecase'
import { Review } from '@interface/mongoose/schemas/review.schema'
import { Types } from 'mongoose'

describe('ListReviewsUseCase', () => {
  let useCase: ListReviewsUseCase
  let repo: jest.Mocked<ReviewRepository>

  beforeEach(() => {
    repo = {
      findByProduct: jest.fn(),
    } as unknown as jest.Mocked<ReviewRepository>
    useCase = new ListReviewsUseCase(repo)
  })

  it('should list reviews for a product', async () => {
    const productObjectId = new Types.ObjectId()

    const reviews: Partial<Review>[] = [
      {
        _id: new Types.ObjectId(),
        productId: productObjectId,
        author: 'A',
        rating: 5,
        comment: 'Great',
      },
      {
        _id: new Types.ObjectId(),
        productId: productObjectId,
        author: 'B',
        rating: 4,
        comment: 'Nice',
      },
    ]
    repo.findByProduct.mockResolvedValue(reviews as unknown as Review[])

    const result = await useCase.execute('abc')
    expect(result).toEqual(reviews)
    expect(repo.findByProduct).toHaveBeenCalledWith('abc')
  })
})
