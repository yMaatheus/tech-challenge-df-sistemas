import { IsString, IsNotEmpty, IsOptional, IsNumber } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger'

export class CreateProductDto {
  @ApiProperty({ description: 'Product name', example: 'Notebook Gamer' })
  @IsString({ message: 'Product name must be a string.' })
  @IsNotEmpty({ message: 'Product name is required.' })
  name: string

  @ApiPropertyOptional({
    description: 'Product description',
    example: 'High-end gaming laptop.',
  })
  @IsString({ message: 'Product description must be a string.' })
  @IsOptional()
  description?: string

  @ApiProperty({ description: 'Product price', example: 3500 })
  @IsNumber({}, { message: 'Product price must be a number.' })
  price: number

  @ApiProperty({ description: 'Product category', example: 'Electronics' })
  @IsString({ message: 'Product category must be a string.' })
  @IsNotEmpty({ message: 'Product category is required.' })
  category: string
}
