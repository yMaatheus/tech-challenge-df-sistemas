import { Test, TestingModule } from '@nestjs/testing'
import { AverageRatingUseCase } from '@app/review/use-cases/average-rating.usecase'
import { BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'
import {
  AverageRatingController,
} from '@http/controllers/review/average-rating.controller'

describe('AverageRatingController', () => {
  let controller: AverageRatingController
  let useCase: AverageRatingUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AverageRatingController],
      providers: [
        { provide: AverageRatingUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<AverageRatingController>(AverageRatingController)
    useCase = module.get<AverageRatingUseCase>(AverageRatingUseCase)
  })

  it('should return average rating for a valid product id', async () => {
    const validProductId = new Types.ObjectId().toHexString()
    jest.spyOn(useCase, 'execute').mockResolvedValue(4.5)

    const result = await controller.handle(validProductId)
    expect(result).toEqual({ average: 4.5 })
    expect(useCase.execute).toHaveBeenCalledWith(validProductId)
  })

  it('should throw BadRequestException if productId is invalid', async () => {
    await expect(controller.handle('123')).rejects.toThrow(BadRequestException)
  })
})
