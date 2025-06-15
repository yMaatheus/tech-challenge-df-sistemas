import { ProductModule } from '@app/product/product.module'
import {
  CreateProductController,
} from '@http/controllers/product/create-product.controller'
import { GetProductController } from '@http/controllers/product/get-product.controller'
import {
  ListProductsController,
} from '@http/controllers/product/list-products.controller'
import {
  RemoveProductController,
} from '@http/controllers/product/remove-product.controller'
import {
  UpdateProductController,
} from '@http/controllers/product/update-product.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [ProductModule],
  controllers: [
    CreateProductController,
    ListProductsController,
    GetProductController,
    UpdateProductController,
    RemoveProductController,
  ],
})
export class HttpModule {}
