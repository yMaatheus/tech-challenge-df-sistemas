import { Test, TestingModule } from '@nestjs/testing'
import { ListReviewsController } from './list-reviews.controller'
import { ListReviewsUseCase } from '@app/review/use-cases/list-reviews.usecase'
import { Types } from 'mongoose'
import { Review } from '@interface/mongoose/schemas/review.schema'

describe('ListReviewsController', () => {
  let controller: ListReviewsController
  let useCase: ListReviewsUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListReviewsController],
      providers: [
        { provide: ListReviewsUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<ListReviewsController>(ListReviewsController)
    useCase = module.get<ListReviewsUseCase>(ListReviewsUseCase)
  })

  it('should list reviews for a product', async () => {
    const validProductId = new Types.ObjectId().toHexString()
    const reviews = [
      {
        _id: 'r1',
        productId: validProductId,
        author: 'A',
        rating: 5,
        comment: 'Great',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        _id: 'r2',
        productId: validProductId,
        author: 'B',
        rating: 4,
        comment: 'Nice',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]
    jest.spyOn(useCase, 'execute').mockResolvedValue(reviews as unknown as Review[])

    expect(await controller.handle(validProductId)).toEqual(reviews)
    expect(useCase.execute).toHaveBeenCalledWith(validProductId)
  })

  it('should return empty array if there are no reviews', async () => {
    const validProductId = new Types.ObjectId().toHexString()
    jest.spyOn(useCase, 'execute').mockResolvedValue([])

    expect(await controller.handle(validProductId)).toEqual([])
    expect(useCase.execute).toHaveBeenCalledWith(validProductId)
  })
})
