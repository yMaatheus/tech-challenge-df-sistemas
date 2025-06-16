import { GetProductUseCase } from '@app/product/use-cases/get-product.usecase'
import {
  Controller,
  Get,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { isIdValid } from '@utils/id-validator'

@ApiTags('Products')
@Controller('products')
export class GetProductController {
  constructor(private readonly getProduct: GetProductUseCase) {}

  @Get(':id')
  @ApiOperation({ summary: 'Get product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product found.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async handle(@Param('id') id: string) {
    if (!isIdValid(id)) {
      throw new BadRequestException('Invalid ID')
    }

    const product = await this.getProduct.execute(id)

    if (!product) {
      throw new NotFoundException('Product not found')
    }

    return product
  }
}
