import { RemoveProductUseCase } from '@app/product/use-cases/remove-product.usecase'
import {
  Controller,
  Delete,
  Param,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'
import { isIdValid } from '@utils/id-validator'

@ApiTags('Products')
@Controller('products')
export class RemoveProductController {
  constructor(private readonly removeProduct: RemoveProductUseCase) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Product deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async handle(@Param('id') id: string) {
    if (!isIdValid(id)) {
      throw new BadRequestException('Invalid ID')
    }

    const removed = await this.removeProduct.execute(id)

    if (!removed) {
      throw new NotFoundException('Product not found')
    }

    return removed
  }
}
