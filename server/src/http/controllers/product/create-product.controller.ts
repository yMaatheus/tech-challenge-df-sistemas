import { CreateProductDto } from '@app/product/dtos/create-product.dto'
import { CreateProductUseCase } from '@app/product/use-cases/create-product.usecase'
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'

@ApiTags('Products')
@Controller('products')
export class CreateProductController {
  constructor(private readonly createProduct: CreateProductUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new product' })
  @ApiResponse({ status: 201, description: 'Product created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @ApiBody({ type: CreateProductDto })
  async handle(@Body() dto: CreateProductDto) {
    return this.createProduct.execute(dto)
  }
}
