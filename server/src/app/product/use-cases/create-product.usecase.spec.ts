import { ProductRepository } from '@interface/repositories/product-repository'
import { CreateProductUseCase } from './create-product.usecase'

describe('CreateProductUseCase', () => {
  let useCase: CreateProductUseCase
  let repo: ProductRepository

  beforeEach(() => {
    repo = { create: jest.fn() } as unknown as jest.Mocked<ProductRepository>
    useCase = new CreateProductUseCase(repo)
  })

  it('should call repository and return created product', async () => {
    const dto = { name: 'Test', price: 10, category: 'X' }
    const mockProduct = { ...dto, _id: 'abc123' };
    (repo.create as jest.Mock).mockResolvedValue(mockProduct)

    const result = await useCase.execute(dto)
    expect(result).toEqual(mockProduct)
    expect(repo.create).toHaveBeenCalledWith(dto)
  })
})
