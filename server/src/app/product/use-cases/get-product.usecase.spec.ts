import { GetProductUseCase } from '@app/product/use-cases/get-product.usecase'
import { ProductRepository } from '@interface/repositories/product-repository'

describe('GetProductUseCase', () => {
  let useCase: GetProductUseCase
  let repo: jest.Mocked<ProductRepository>

  beforeEach(() => {
    repo = { findById: jest.fn() } as unknown as jest.Mocked<ProductRepository>
    useCase = new GetProductUseCase(repo)
  })

  it('should return a product by id', async () => {
    const product = { name: 'P1', price: 10, category: 'C1', description: 'D1' }

    repo.findById.mockResolvedValue(product as never)

    const result = await useCase.execute('abc123')
    expect(result).toEqual(product)
    expect(repo.findById).toHaveBeenCalledWith('abc123')
  })

  it('should return null if product is not found', async () => {
    repo.findById.mockResolvedValue(null)

    const result = await useCase.execute('notfound')
    expect(result).toBeNull()
  })
})
