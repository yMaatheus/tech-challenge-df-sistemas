import { ProductModule } from '@app/product/product.module'
import { ReviewModule } from '@app/review/review.module'
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
import {
  AverageRatingController,
} from '@http/controllers/review/average-rating.controller'
import { CreateReviewController } from '@http/controllers/review/create-review.controller'
import { ListReviewsController } from '@http/controllers/review/list-reviews.controller'
import { RemoveReviewController } from '@http/controllers/review/remove-review.controller'
import { UpdateReviewController } from '@http/controllers/review/update-review.controller'
import { Module } from '@nestjs/common'

@Module({
  imports: [ProductModule, ReviewModule],
  controllers: [
    CreateProductController,
    ListProductsController,
    GetProductController,
    UpdateProductController,
    RemoveProductController,
    AverageRatingController,
    CreateReviewController,
    ListReviewsController,
    RemoveReviewController,
    UpdateReviewController,
  ],
})
export class HttpModule {}
