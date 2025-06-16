import { ProductRepository } from '@interface/repositories/product-repository'
import { RemoveProductUseCase } from './remove-product.usecase'

describe('RemoveProductUseCase', () => {
  let useCase: RemoveProductUseCase
  let repo: jest.Mocked<ProductRepository>

  beforeEach(() => {
    repo = { remove: jest.fn() } as unknown as jest.Mocked<ProductRepository>
    useCase = new RemoveProductUseCase(repo)
  })

  it('should remove a product and return the removed object', async () => {
    const removed = { name: 'P3', price: 10, category: 'C3', description: 'D3' }
    repo.remove.mockResolvedValue(removed as never)

    const result = await useCase.execute('abc123')
    expect(result).toEqual(removed)
    expect(repo.remove).toHaveBeenCalledWith('abc123')
  })

  it('should return null if product does not exist', async () => {
    repo.remove.mockResolvedValue(null)

    const result = await useCase.execute('notfound')
    expect(result).toBeNull()
  })
})
