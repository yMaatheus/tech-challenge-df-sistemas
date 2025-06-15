import { UpdateProductDto } from '@app/product/dtos/update-product.dto'
import { ProductRepository } from '@interface/mongoose/product/product.repository'
import { Injectable } from '@nestjs/common'

@Injectable()
export class UpdateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(id: string, dto: UpdateProductDto) {
    return this.productRepository.update(id, dto)
  }
}
