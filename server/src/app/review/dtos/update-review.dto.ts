import { IsString, IsOptional, IsNumber, Min, Max } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateReviewDto {
  @ApiPropertyOptional({
    description: 'Name of the review author',
    example: 'John Doe',
  })
  @IsString({ message: 'Author must be a string.' })
  @IsOptional()
  author?: string

  @ApiPropertyOptional({
    description: 'Rating for the product (1 to 5)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber({}, { message: 'Rating must be a number between 1 and 5.' })
  @Min(1, { message: 'Rating must be at least 1.' })
  @Max(5, { message: 'Rating must be at most 5.' })
  @IsOptional()
  rating?: number

  @ApiPropertyOptional({
    description: 'Comment about the product',
    example: 'Now with updated feedback.',
  })
  @IsString({ message: 'Comment must be a string.' })
  @IsOptional()
  comment?: string
}
