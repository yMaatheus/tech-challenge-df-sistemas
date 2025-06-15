import { ListReviewsUseCase } from '@app/review/use-cases/list-reviews.usecase'
import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

@ApiTags('Reviews')
@Controller('reviews')
export class ListReviewsController {
  constructor(private readonly listReviews: ListReviewsUseCase) {}

  @Get('product/:productId')
  @ApiOperation({ summary: 'List all reviews for a specific product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'List of reviews returned successfully.' })
  async handle(@Param('productId') productId: string) {
    return this.listReviews.execute(productId)
  }
}
