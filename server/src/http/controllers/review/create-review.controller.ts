import { CreateReviewDto } from '@app/review/dtos/create-review.dto'
import { CreateReviewUseCase } from '@app/review/use-cases/create-review.usecase'
import { Controller, Post, Body, HttpCode, HttpStatus } from '@nestjs/common'
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger'

@ApiTags('reviews')
@Controller('reviews')
export class CreateReviewController {
  constructor(private readonly createReview: CreateReviewUseCase) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create a new review for a product' })
  @ApiBody({ type: CreateReviewDto })
  @ApiResponse({ status: 201, description: 'Review created successfully.' })
  @ApiResponse({ status: 400, description: 'Validation error.' })
  async handle(@Body() dto: CreateReviewDto) {
    return this.createReview.execute(dto)
  }
}
