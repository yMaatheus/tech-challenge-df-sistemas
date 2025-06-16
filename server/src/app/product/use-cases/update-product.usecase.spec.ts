import { ProductRepository } from '@interface/repositories/product-repository'
import { UpdateProductUseCase } from './update-product.usecase'

describe('UpdateProductUseCase', () => {
  let useCase: UpdateProductUseCase
  let repo: jest.Mocked<ProductRepository>

  beforeEach(() => {
    repo = { update: jest.fn() } as unknown as jest.Mocked<ProductRepository>
    useCase = new UpdateProductUseCase(repo)
  })

  it('should update a product and return the updated object', async () => {
    const dto = { name: 'P2' }
    const updated = { name: 'P2', price: 10, category: 'C1', description: 'D1' }
    repo.update.mockResolvedValue(updated as never)

    const result = await useCase.execute('abc123', dto)
    expect(result).toEqual(updated)
    expect(repo.update).toHaveBeenCalledWith('abc123', dto)
  })

  it('should return null if product does not exist', async () => {
    repo.update.mockResolvedValue(null)

    const result = await useCase.execute('notfound', { name: 'X' })
    expect(result).toBeNull()
  })
})
