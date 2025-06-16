import { IsString, IsNotEmpty, IsNumber, Min, Max } from 'class-validator'
import { ApiProperty } from '@nestjs/swagger'
import { Types } from 'mongoose'

export class CreateReviewDto {
  @ApiProperty({
    description: 'ID of the product being reviewed',
    example: '665bb0bf7a9b0a90e85e58c1',
  })
  @IsString({ message: 'Product ID must be a string.' })
  @IsNotEmpty({ message: 'Product ID is required.' })
  productId: string | Types.ObjectId

  @ApiProperty({
    description: 'Name of the review author',
    example: 'John Doe',
  })
  @IsString({ message: 'Author must be a string.' })
  @IsNotEmpty({ message: 'Author is required.' })
  author: string

  @ApiProperty({
    description: 'Rating for the product (1 to 5)',
    example: 4,
    minimum: 1,
    maximum: 5,
  })
  @IsNumber({}, { message: 'Rating must be a number between 1 and 5.' })
  @Min(1, { message: 'Rating must be at least 1.' })
  @Max(5, { message: 'Rating must be at most 5.' })
  rating: number

  @ApiProperty({
    description: 'Comment about the product',
    example: 'Amazing laptop, fast and quiet.',
  })
  @IsString({ message: 'Comment must be a string.' })
  @IsNotEmpty({ message: 'Comment is required.' })
  comment: string
}
