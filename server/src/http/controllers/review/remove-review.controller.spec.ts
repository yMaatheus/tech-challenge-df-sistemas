import { Test, TestingModule } from '@nestjs/testing'
import { RemoveReviewUseCase } from '@app/review/use-cases/remove-review.usecase'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'
import { Review } from '@interface/mongoose/schemas/review.schema'
import { RemoveReviewController } from '@http/controllers/review/remove-review.controller'

describe('RemoveReviewController', () => {
  let controller: RemoveReviewController
  let useCase: RemoveReviewUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveReviewController],
      providers: [
        { provide: RemoveReviewUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<RemoveReviewController>(RemoveReviewController)
    useCase = module.get<RemoveReviewUseCase>(RemoveReviewUseCase)
  })

  it('should remove a review successfully', async () => {
    const validId = new Types.ObjectId().toHexString()
    const review = {
      _id: validId,
      author: 'John',
      rating: 5,
      comment: 'Great',
      productId: validId,
    }
    jest.spyOn(useCase, 'execute').mockResolvedValue(review as unknown as Review)

    const result = await controller.handle(validId)
    expect(result).toEqual(review)
    expect(useCase.execute).toHaveBeenCalledWith(validId)
  })

  it('should throw NotFoundException if review not found', async () => {
    const validId = new Types.ObjectId().toHexString()
    jest.spyOn(useCase, 'execute').mockResolvedValue(null)

    await expect(controller.handle(validId)).rejects.toThrow(NotFoundException)
  })

  it('should throw BadRequestException if id is invalid', async () => {
    await expect(controller.handle('123')).rejects.toThrow(BadRequestException)
  })
})
