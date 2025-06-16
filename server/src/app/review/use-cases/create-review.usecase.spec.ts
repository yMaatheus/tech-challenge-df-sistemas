import { ReviewRepository } from '@interface/repositories/review-repository'
import { CreateReviewUseCase } from './create-review.usecase'
import { CreateReviewDto } from '../dtos/create-review.dto'

describe('CreateReviewUseCase', () => {
  let useCase: CreateReviewUseCase
  let repo: jest.Mocked<ReviewRepository>

  beforeEach(() => {
    repo = { create: jest.fn() } as unknown as jest.Mocked<ReviewRepository>
    useCase = new CreateReviewUseCase(repo)
  })

  it('should create a review and return it', async () => {
    const dto: CreateReviewDto = {
      productId: 'abc123',
      author: 'John Doe',
      rating: 4,
      comment: 'Nice product!',
    }
    const mockReview = {
      ...dto,
      _id: 'review1',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    repo.create.mockResolvedValue(mockReview as never)

    const result = await useCase.execute(dto)
    expect(result).toEqual(mockReview)
    expect(repo.create).toHaveBeenCalledWith(dto)
  })
})
