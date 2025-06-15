import { UpdateReviewDto } from '@app/review/dtos/update-review.dto'
import { UpdateReviewUseCase } from '@app/review/use-cases/update-review.usecase'
import { Controller, Patch, Param, Body, NotFoundException } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiParam, ApiResponse, ApiBody } from '@nestjs/swagger'

@ApiTags('Reviews')
@Controller('reviews')
export class UpdateReviewController {
  constructor(private readonly updateReview: UpdateReviewUseCase) {}

  @Patch(':id')
  @ApiOperation({ summary: 'Update a review by ID' })
  @ApiParam({ name: 'id', description: 'Review ID' })
  @ApiBody({ type: UpdateReviewDto })
  @ApiResponse({ status: 200, description: 'Review updated successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  @ApiResponse({ status: 404, description: 'Review not found.' })
  async handle(@Param('id') id: string, @Body() dto: UpdateReviewDto) {
    const updated = await this.updateReview.execute(id, dto)

    if (!updated) {
      throw new NotFoundException('Review not found')
    }

    return updated
  }
}
