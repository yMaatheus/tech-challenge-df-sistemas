import { Test, TestingModule } from '@nestjs/testing'
import { UpdateReviewController } from './update-review.controller'
import { UpdateReviewUseCase } from '@app/review/use-cases/update-review.usecase'
import { UpdateReviewDto } from '@app/review/dtos/update-review.dto'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'
import { Review } from '@interface/mongoose/schemas/review.schema'

describe('UpdateReviewController', () => {
  let controller: UpdateReviewController
  let useCase: UpdateReviewUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateReviewController],
      providers: [
        { provide: UpdateReviewUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<UpdateReviewController>(UpdateReviewController)
    useCase = module.get<UpdateReviewUseCase>(UpdateReviewUseCase)
  })

  it('should update a review successfully', async () => {
    const validId = new Types.ObjectId().toHexString()
    const dto: UpdateReviewDto = { rating: 5, comment: 'Updated!' }
    const review = { _id: validId, ...dto, author: 'Jane', productId: validId }
    jest
      .spyOn(useCase, 'execute')
      .mockResolvedValue(review as unknown as Review)

    const result = await controller.handle(validId, dto)
    expect(result).toEqual(review)
    expect(useCase.execute).toHaveBeenCalledWith(validId, dto)
  })

  it('should throw NotFoundException if review not found', async () => {
    const validId = new Types.ObjectId().toHexString()
    const dto: UpdateReviewDto = { rating: 2 }
    jest.spyOn(useCase, 'execute').mockResolvedValue(null)

    await expect(controller.handle(validId, dto)).rejects.toThrow(
      NotFoundException,
    )
  })

  it('should throw BadRequestException if id is invalid', async () => {
    const dto: UpdateReviewDto = { rating: 1 }
    await expect(controller.handle('invalid', dto)).rejects.toThrow(
      BadRequestException,
    )
  })
})
