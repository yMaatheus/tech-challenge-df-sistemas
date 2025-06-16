import { CreateProductDto } from '@app/product/dtos/create-product.dto'
import { ProductRepository } from '@interface/repositories/product-repository'
import { Inject, Injectable } from '@nestjs/common'

@Injectable()
export class CreateProductUseCase {
  constructor(
    @Inject('ProductRepository')
    private readonly productRepository: ProductRepository,
  ) {}

  async execute(dto: CreateProductDto) {
    return this.productRepository.create(dto)
  }
}
