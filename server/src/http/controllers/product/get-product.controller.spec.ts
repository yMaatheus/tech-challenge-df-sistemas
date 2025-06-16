import { Test, TestingModule } from '@nestjs/testing'
import { GetProductController } from './get-product.controller'
import { GetProductUseCase } from '@app/product/use-cases/get-product.usecase'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'
import { Product } from '@interface/mongoose/schemas/product.schema'

describe('GetProductController', () => {
  let controller: GetProductController
  let useCase: GetProductUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetProductController],
      providers: [
        { provide: GetProductUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<GetProductController>(GetProductController)
    useCase = module.get<GetProductUseCase>(GetProductUseCase)
  })

  it('should return a product by id', async () => {
    const product = { _id: '1', name: 'X' }
    jest.spyOn(useCase, 'execute').mockResolvedValue(product as Product)
    const validId = new Types.ObjectId().toHexString()

    expect(await controller.handle(validId)).toEqual(product)
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
