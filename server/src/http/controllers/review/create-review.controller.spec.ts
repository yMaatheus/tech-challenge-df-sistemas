import { Test, TestingModule } from '@nestjs/testing'
import { CreateReviewUseCase } from '@app/review/use-cases/create-review.usecase'
import { CreateReviewDto } from '@app/review/dtos/create-review.dto'
import { Types } from 'mongoose'
import { ReviewDocument } from '@interface/mongoose/schemas/review.schema'
import { CreateReviewController } from '@http/controllers/review/create-review.controller'

describe('CreateReviewController', () => {
  let controller: CreateReviewController
  let useCase: CreateReviewUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateReviewController],
      providers: [
        { provide: CreateReviewUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<CreateReviewController>(CreateReviewController)
    useCase = module.get<CreateReviewUseCase>(CreateReviewUseCase)
  })

  it('should create a review', async () => {
    const dto: CreateReviewDto = {
      productId: new Types.ObjectId(), // id válido
      author: 'A',
      rating: 4,
      comment: 'Good!',
    }
    const review = {
      ...dto,
      _id: new Types.ObjectId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    }
    jest.spyOn(useCase, 'execute').mockResolvedValue(review as unknown as ReviewDocument)

    expect(await controller.handle(dto)).toEqual(review)
    expect(useCase.execute).toHaveBeenCalledWith(dto)
  })
})
