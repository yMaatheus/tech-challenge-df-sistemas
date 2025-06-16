import { ProductRepository } from '@interface/repositories/product-repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class GetProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string) {
    return this.productRepository.findById(id)
  }
}
