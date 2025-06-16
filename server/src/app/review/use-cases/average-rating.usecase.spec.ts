import { Types } from 'mongoose'
import { AverageRatingUseCase } from './average-rating.usecase'
import { ReviewRepository } from '@interface/repositories/review-repository'

describe('AverageRatingUseCase', () => {
  let useCase: AverageRatingUseCase
  let repo: jest.Mocked<ReviewRepository>

  beforeEach(() => {
    repo = {
      averageRating: jest.fn(),
    } as unknown as jest.Mocked<ReviewRepository>
    useCase = new AverageRatingUseCase(repo)
  })

  it('should return the average rating of a product', async () => {
    const productObjectId = new Types.ObjectId()
    repo.averageRating.mockResolvedValue(4.5)

    const result = await useCase.execute(productObjectId.toHexString())
    expect(result).toBe(4.5)
    expect(repo.averageRating).toHaveBeenCalledWith(productObjectId.toHexString())
  })

  it('should return 0 if there are no reviews', async () => {
    const productObjectId = new Types.ObjectId()
    repo.averageRating.mockResolvedValue(0)

    const result = await useCase.execute(productObjectId.toHexString())
    expect(result).toBe(0)
  })
})
