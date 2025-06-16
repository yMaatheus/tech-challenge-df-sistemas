import { ListProductsUseCase } from '@app/product/use-cases/list-products.usecase'
import { ProductRepository } from '@interface/repositories/product-repository'

describe('ListProductsUseCase', () => {
  let useCase: ListProductsUseCase
  let repo: ProductRepository

  beforeEach(() => {
    repo = { findAll: jest.fn() } as unknown as jest.Mocked<ProductRepository>
    useCase = new ListProductsUseCase(repo)
  })

  it('should return a list of products', async () => {
    const products = [
      { name: 'P1', price: 10, category: 'C1', description: 'D1' },
      { name: 'P2', price: 20, category: 'C2', description: 'D2' },
    ];

    (repo.findAll as jest.Mock).mockResolvedValue(products)

    const result = await useCase.execute()
    expect(result).toEqual(products)
    expect(repo.findAll).toHaveBeenCalled()
  })
})
