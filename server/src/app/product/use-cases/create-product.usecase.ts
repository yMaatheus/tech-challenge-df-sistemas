import { CreateProductDto } from '@app/product/dtos/create-product.dto';
import { ProductRepository } from '@interface/mongoose/product/product.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class CreateProductUseCase {
  constructor(private readonly productRepository: ProductRepository) {}

  async execute(dto: CreateProductDto) {
    return this.productRepository.create(dto);
  }
}
