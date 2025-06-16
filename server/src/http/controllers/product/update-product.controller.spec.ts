import { Test, TestingModule } from '@nestjs/testing'
import { UpdateProductController } from './update-product.controller'
import { UpdateProductUseCase } from '@app/product/use-cases/update-product.usecase'
import { UpdateProductDto } from '@app/product/dtos/update-product.dto'
import { NotFoundException, BadRequestException } from '@nestjs/common'
import { Types } from 'mongoose'
import { Product } from '@interface/mongoose/schemas/product.schema'

describe('UpdateProductController', () => {
  let controller: UpdateProductController
  let useCase: UpdateProductUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UpdateProductController],
      providers: [
        { provide: UpdateProductUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<UpdateProductController>(UpdateProductController)
    useCase = module.get<UpdateProductUseCase>(UpdateProductUseCase)
  })

  it('should update a product', async () => {
    const dto: UpdateProductDto = { name: 'New Name' }
    const updated = { _id: '1', name: 'New Name' }
    jest.spyOn(useCase, 'execute').mockResolvedValue(updated as Product)
    const validId = new Types.ObjectId().toHexString()

    expect(await controller.handle(validId, dto)).toEqual(updated)
    expect(useCase.execute).toHaveBeenCalledWith(validId, dto)
  })

  it('should throw NotFoundException if product does not exist', async () => {
    jest.spyOn(useCase, 'execute').mockResolvedValue(null)
    const validId = new Types.ObjectId().toHexString()

    await expect(controller.handle(validId, { name: 'test' })).rejects.toThrow(
      NotFoundException,
    )
  })

  it('should throw BadRequestException if id is invalid', async () => {
    await expect(controller.handle('1', { name: 'test' })).rejects.toThrow(
      BadRequestException,
    )
  })
})
