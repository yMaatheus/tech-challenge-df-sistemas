import { UpdateProductDto } from '@app/product/dtos/update-product.dto'
import { UpdateProductUseCase } from '@app/product/use-cases/update-product.usecase'
import {
  Controller,
  Patch,
  Param,
  Body,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common'
import {
  ApiTags,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiBody,
} from '@nestjs/swagger'
import { isIdValid } from '@utils/id-validator'

@ApiTags('Products')
@Controller('products')
export class UpdateProductController {
  constructor(private readonly updateProduct: UpdateProductUseCase) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update product by ID' })
  @ApiParam({ name: 'id', description: 'Product ID' })
  @ApiBody({ type: UpdateProductDto })
  @ApiResponse({ status: 200, description: 'Product updated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @ApiResponse({ status: 404, description: 'Product not found.' })
  async handle(@Param('id') id: string, @Body() dto: UpdateProductDto) {
    if (!isIdValid(id)) {
      throw new BadRequestException('Invalid ID')
    }

    const updated = await this.updateProduct.execute(id, dto)

    if (!updated) {
      throw new NotFoundException('Product not found')
    }

    return updated
  }
}
