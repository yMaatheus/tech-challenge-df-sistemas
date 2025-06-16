import { ProductRepository } from '@interface/repositories/product-repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class ListProductsUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute() {
    return this.productRepository.findAll()
  }
}
