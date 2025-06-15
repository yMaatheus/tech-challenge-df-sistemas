import { ProductRepository } from '@interface/mongoose/product/product.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class ListProductsUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute() {
    return this.productRepository.findAll()
  }
}
