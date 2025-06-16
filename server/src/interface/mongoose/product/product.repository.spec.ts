import { Connection, Model, Types } from 'mongoose'
import { Test, TestingModule } from '@nestjs/testing'
import { getModelToken, MongooseModule } from '@nestjs/mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { ProductMongooseRepository } from '@interface/mongoose/product/product.repository'
import {
  Product,
  ProductDocument,
  ProductSchema,
} from '@interface/mongoose/schemas/product.schema'

describe('ProductMongooseRepository', () => {
  let mongoServer: MongoMemoryServer
  let connection: Connection
  let productRepository: ProductMongooseRepository
  let productModel: Model<ProductDocument>

  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create()
    const uri = mongoServer.getUri()

    const moduleRef: TestingModule = await Test.createTestingModule({
      imports: [
        MongooseModule.forRoot(uri),
        MongooseModule.forFeature([
          { name: Product.name, schema: ProductSchema },
        ]),
      ],
      providers: [ProductMongooseRepository],
    }).compile()

    productRepository = moduleRef.get<ProductMongooseRepository>(
      ProductMongooseRepository,
    )
    productModel = moduleRef.get<Model<ProductDocument>>(
      getModelToken(Product.name),
    )
    connection = productModel.db
  })

  afterAll(async () => {
    await connection.close()
    await mongoServer.stop()
  })

  afterEach(async () => {
    await productModel.deleteMany({})
  })

  it('should create a product', async () => {
    const productData = {
      name: 'Notebook',
      price: 2000,
      category: 'Electronics',
      description: 'Ultrabook',
    }
    const product = await productRepository.create(productData)
    expect(product.name).toBe('Notebook')
    expect(product._id).toBeDefined()
    expect(product._id).toBeInstanceOf(Types.ObjectId)
  })

  it('should list products', async () => {
    await productRepository.create({ name: 'P1', price: 10, category: 'C1' })
    await productRepository.create({ name: 'P2', price: 20, category: 'C2' })
    const products = await productRepository.findAll()
    expect(products.length).toBe(2)
  })

  it('should find by id', async () => {
    const p = await productRepository.create({
      name: 'Test',
      price: 1,
      category: 'X',
    })
    const found = await productRepository.findById(p._id.toString())
    expect(found).not.toBeNull()
    expect(found?.name).toBe('Test')
  })

  it('should update', async () => {
    const p = await productRepository.create({
      name: 'A',
      price: 1,
      category: 'X',
    })
    const updated = await productRepository.update(p._id.toString(), { name: 'B' })
    expect(updated?.name).toBe('B')
  })

  it('should remove', async () => {
    const p = await productRepository.create({
      name: 'Del',
      price: 1,
      category: 'X',
    })
    await productRepository.remove(p._id.toString())
    const found = await productRepository.findById(p._id.toString())
    expect(found).toBeNull()
  })
})
