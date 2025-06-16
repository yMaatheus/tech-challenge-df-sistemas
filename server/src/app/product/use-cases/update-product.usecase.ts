import { UpdateProductDto } from '@app/product/dtos/update-product.dto'
import { ProductRepository } from '@interface/repositories/product-repository'

import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class UpdateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(id: string, dto: UpdateProductDto) {
    return this.productRepository.update(id, dto)
  }
}
