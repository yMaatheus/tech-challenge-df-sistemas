import { Connection, Model } from 'mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ReviewMongooseRepository } from '@interface/mongoose/review/review.repository'
import {
  Product,
  ProductDocument,
  ProductSchema,
} from '@interface/mongoose/schemas/product.schema'
import {
  Review,
  ReviewDocument,
  ReviewSchema,
} from '@interface/mongoose/schemas/review.schema'

describe('ReviewMongooseRepository', () => {
  let mongoServer: MongoMemoryServer
  let connection: Connection
  let reviewRepository: ReviewMongooseRepository
  let reviewModel: Model<ReviewDocument>
  let productModel: Model<ProductDocument>

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: Review.name, schema: ReviewSchema },
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      providers: [ReviewMongooseRepository],
    }).compile()

    reviewRepository = moduleRef.get<ReviewMongooseRepository>(
      ReviewMongooseRepository,
    )
    reviewModel = moduleRef.get<Model<ReviewDocument>>(
      getModelToken(Review.name),
    )
    productModel = moduleRef.get<Model<ProductDocument>>(
      getModelToken(Product.name),
    )
    connection = reviewModel.db
  })

  afterAll(async () => {
    await connection.close()
    await mongoServer.stop()
  })

  afterEach(async () => {
    await reviewModel.deleteMany({})
    await productModel.deleteMany({})
  })

  it('should create a review', async () => {
    const product = await productModel.create({
      name: 'Test Product',
      price: 100,
      category: 'Test',
      description: 'desc',
    })
    const review = await reviewRepository.create({
      productId: product._id,
      author: 'John',
      rating: 5,
      comment: 'Excellent!',
    })
    expect(review.author).toBe('John')
    expect(review.productId).toBeDefined()
  })

  it('should find reviews by product', async () => {
    const product = await productModel.create({
      name: 'Product1',
      price: 100,
      category: 'Cat',
      description: 'desc',
    })
    await reviewRepository.create({
      productId: product._id,
      author: 'A',
      rating: 5,
      comment: 'Great',
    })
    await reviewRepository.create({
      productId: product._id,
      author: 'B',
      rating: 4,
      comment: 'Nice',
    })

    const reviews = await reviewRepository.findByProduct(product._id)
    expect(reviews.length).toBe(2)
    expect(reviews[0].author).toBeDefined()
  })

  it('should find by id', async () => {
    const product = await productModel.create({
      name: 'Test',
      price: 200,
      category: 'X',
      description: 'desc',
    })
    const review = await reviewRepository.create({
      productId: product._id,
      author: 'C',
      rating: 3,
      comment: 'ok',
    })
    const found = await reviewRepository.findById(review._id.toString())
    expect(found).not.toBeNull()
    expect(found?.author).toBe('C')
  })

  it('should update a review', async () => {
    const product = await productModel.create({
      name: 'UpTest',
      price: 300,
      category: 'Y',
      description: 'desc',
    })
    const review = await reviewRepository.create({
      productId: product._id,
      author: 'D',
      rating: 2,
      comment: 'bad',
    })
    const updated = await reviewRepository.update(review._id.toString(), {
      rating: 4,
      comment: 'better',
    })
    expect(updated?.rating).toBe(4)
    expect(updated?.comment).toBe('better')
  })

  it('should remove a review', async () => {
    const product = await productModel.create({
      name: 'DelTest',
      price: 400,
      category: 'Z',
      description: 'desc',
    })
    const review = await reviewRepository.create({
      productId: product._id,
      author: 'E',
      rating: 1,
      comment: 'worst',
    })
    await reviewRepository.remove(review._id.toString())
    const found = await reviewRepository.findById(review._id.toString())
    expect(found).toBeNull()
  })

  it('should calculate average rating', async () => {
    const product = await productModel.create({
      name: 'AvgTest',
      price: 500,
      category: 'Q',
      description: 'desc',
    })
    await reviewRepository.create({
      productId: product._id,
      author: 'F',
      rating: 4,
      comment: 'good',
    })
    await reviewRepository.create({
      productId: product._id,
      author: 'G',
      rating: 2,
      comment: 'ok',
    })
    const avg = await reviewRepository.averageRating(product._id)
    expect(avg).toBe(3)
  })
})
