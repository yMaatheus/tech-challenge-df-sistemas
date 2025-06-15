import { ProductRepository } from '@interface/mongoose/product/product.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class RemoveProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string) {
    return this.productRepository.remove(id)
  }
}
