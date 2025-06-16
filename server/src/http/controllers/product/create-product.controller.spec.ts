import { Test, TestingModule } from '@nestjs/testing'
import { CreateProductController } from './create-product.controller'
import { CreateProductUseCase } from '@app/product/use-cases/create-product.usecase'
import { CreateProductDto } from '@app/product/dtos/create-product.dto'
import { ProductDocument } from '@interface/mongoose/schemas/product.schema'

describe('CreateProductController', () => {
  let controller: CreateProductController
  let useCase: CreateProductUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CreateProductController],
      providers: [
        { provide: CreateProductUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<CreateProductController>(CreateProductController)
    useCase = module.get<CreateProductUseCase>(CreateProductUseCase)
  })

  it('should create a product', async () => {
    const dto: CreateProductDto = {
      name: 'Test',
      description: 'Test Desc',
      price: 100,
      category: 'Cat',
    }
    const result = { ...dto, _id: '1', createdAt: new Date() }

    jest.spyOn(useCase, 'execute').mockResolvedValue(result as unknown as ProductDocument)

    expect(await controller.handle(dto)).toEqual(result)
    expect(useCase.execute).toHaveBeenCalledWith(dto)
  })
})
