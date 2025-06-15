import { ListProductsUseCase } from '@app/product/use-cases/list-products.usecase'
import { Controller, Get } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger'

@ApiTags('products')
@Controller('products')
export class ListProductsController {
  constructor(private readonly listProducts: ListProductsUseCase) {}

  @Get()
  @ApiOperation({ summary: 'List all products' })
  @ApiResponse({ status: 200, description: 'List of products returned successfully.' })
  async handle() {
    return this.listProducts.execute()
  }
}
