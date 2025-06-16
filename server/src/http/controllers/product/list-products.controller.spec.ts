import { Test, TestingModule } from '@nestjs/testing'
import { ListProductsController } from './list-products.controller'
import { ListProductsUseCase } from '@app/product/use-cases/list-products.usecase'
import { Product } from '@interface/mongoose/schemas/product.schema'

describe('ListProductsController', () => {
  let controller: ListProductsController
  let useCase: ListProductsUseCase

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ListProductsController],
      providers: [
        { provide: ListProductsUseCase, useValue: { execute: jest.fn() } },
      ],
    }).compile()

    controller = module.get<ListProductsController>(ListProductsController)
    useCase = module.get<ListProductsUseCase>(ListProductsUseCase)
  })

  it('should list products', async () => {
    const products = [
      { _id: '1', name: 'A', description: 'desc A', price: 10, category: 'CatA' },
      { _id: '2', name: 'B', description: 'desc B', price: 20, category: 'CatB' },
    ]
    jest.spyOn(useCase, 'execute').mockResolvedValue(products as Product[])

    expect(await controller.handle()).toEqual(products)
    expect(useCase.execute).toHaveBeenCalled()
  })
})
