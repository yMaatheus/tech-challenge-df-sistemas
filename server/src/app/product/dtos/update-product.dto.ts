import { IsString, IsOptional, IsNumber } from 'class-validator'
import { ApiPropertyOptional } from '@nestjs/swagger'

export class UpdateProductDto {
  @ApiPropertyOptional({
    description: 'Product name',
    example: 'Notebook Gamer',
  })
  @IsString({ message: 'Product name must be a string.' })
  @IsOptional()
  name?: string

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'High-end gaming laptop.',
  })
  @IsString({ message: 'Product description must be a string.' })
  @IsOptional()
  description?: string

  @ApiPropertyOptional({ description: 'Product price', example: 3500 })
  @IsNumber({}, { message: 'Product price must be a number.' })
  @IsOptional()
  price?: number

  @ApiPropertyOptional({
    description: 'Product category',
    example: 'Electronics',
  })
  @IsString({ message: 'Product category must be a string.' })
  @IsOptional()
  category?: string
}
