import { Test, TestingModule } from '@nestjs/testing'
import { RemoveProductController } from './remove-product.controller'
import { RemoveProductUseCase } from '@app/product/use-cases/remove-product.usecase'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'
import { Product } from '@interface/mongoose/schemas/product.schema'

describe('RemoveProductController', () => {
  let controller: RemoveProductController
  let useCase: RemoveProductUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RemoveProductController],
      providers: [
        { provide: RemoveProductUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<RemoveProductController>(RemoveProductController)
    useCase = module.get<RemoveProductUseCase>(RemoveProductUseCase)
  })

  it('should remove a product', async () => {
    const removed = { _id: '1', name: 'Del' }
    jest.spyOn(useCase, 'execute').mockResolvedValue(removed as Product)
    const validId = new Types.ObjectId().toHexString()

    expect(await controller.handle(validId)).toEqual(removed)
    expect(useCase.execute).toHaveBeenCalledWith(validId)
  })

  it('should throw NotFoundException if not found', async () => {
    jest.spyOn(useCase, 'execute').mockResolvedValue(null)
    const validId = new Types.ObjectId().toHexString()

    await expect(controller.handle(validId)).rejects.toThrow(NotFoundException)
  })

  it('should throw BadRequestException if id is invalid', async () => {
    await expect(controller.handle('1')).rejects.toThrow(BadRequestException)
  })
})
