import { Module } from '@nestjs/common'
import { HttpModule } from '@http/http.module'
import { DatabaseModule } from '@app/database/database.module'
import { ProductModule } from '@app/product/product.module'
import { ReviewModule } from '@app/review/review.module'
import { ConfigModule } from '@nestjs/config'

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env.local' }),
    DatabaseModule,
    HttpModule,
    ProductModule,
    ReviewModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
