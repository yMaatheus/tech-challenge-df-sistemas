import { AverageRatingUseCase } from '@app/review/use-cases/average-rating.usecase'
import { Controller, Get, Param } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

@ApiTags('reviews')
@Controller('reviews')
export class AverageRatingController {
  constructor(private readonly averageRating: AverageRatingUseCase) {}

  @Get('product/:productId/average')
  @ApiOperation({ summary: 'Get average rating for a specific product' })
  @ApiParam({ name: 'productId', description: 'Product ID' })
  @ApiResponse({ status: 200, description: 'Average rating returned successfully.' })
  async handle(@Param('productId') productId: string) {
    const average = await this.averageRating.execute(productId)

    return { average }
  }
}
