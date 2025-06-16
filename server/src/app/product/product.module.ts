import { CreateProductUseCase } from '@app/product/use-cases/create-product.usecase'
import { GetProductUseCase } from '@app/product/use-cases/get-product.usecase'
import { ListProductsUseCase } from '@app/product/use-cases/list-products.usecase'
import { RemoveProductUseCase } from '@app/product/use-cases/remove-product.usecase'
import { UpdateProductUseCase } from '@app/product/use-cases/update-product.usecase'
import { ProductMongooseRepository } from '@interface/mongoose/product/product.repository'
import {
  Product,
  ProductSchema,
} from '@interface/mongoose/schemas/product.schema'
import { Module } from '@nestjs/common'
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [
    { provide: 'ProductRepository', useClass: ProductMongooseRepository },
    CreateProductUseCase,
    UpdateProductUseCase,
    ListProductsUseCase,
    GetProductUseCase,
    RemoveProductUseCase,
  ],
  exports: [
    CreateProductUseCase,
    UpdateProductUseCase,
    ListProductsUseCase,
    GetProductUseCase,
    RemoveProductUseCase,
  ],
})
export class ProductModule {}
