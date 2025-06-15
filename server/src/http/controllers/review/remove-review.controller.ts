import { RemoveReviewUseCase } from '@app/review/use-cases/remove-review.usecase'
import { Controller, Delete, Param, NotFoundException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger'

@ApiTags('Reviews')
@Controller('reviews')
export class RemoveReviewController {
  constructor(private readonly removeReview: RemoveReviewUseCase) {}

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a review by ID' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiResponse({ status: 200, description: 'Review deleted successfully.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  async handle(@Param('id') id: string) {
    const removed = await this.removeReview.execute(id)

    if (!removed) {
      throw new NotFoundException('Review not found')
    }

    return removed
  }
}
