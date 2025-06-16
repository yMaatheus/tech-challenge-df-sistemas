/* eslint-disable @typescript-eslint/no-require-imports */
const mongoose = require('mongoose')
const { faker } = require('@faker-js/faker')

const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
}, { timestamps: true })

const ReviewSchema = new mongoose.Schema({
  productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product' },
  author: String,
  rating: Number,
  comment: String,
}, { timestamps: true })

const Product = mongoose.model('Product', ProductSchema)
const Review = mongoose.model('Review', ReviewSchema)

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/products-db'

async function seed() {
  await mongoose.connect(MONGO_URI)

  await Product.deleteMany({})
  await Review.deleteMany({})

  const products = []

  for (let i = 0; i < 5; i++) {
    const product = await Product.create({
      name: faker.commerce.productName(),
      description: faker.commerce.productDescription(),
      price: Number(faker.commerce.price()),
      category: faker.commerce.department(),
    })
    products.push(product)
  }

  for (const product of products) {
    const reviewCount = faker.number.int({ min: 2, max: 7 })
    for (let i = 0; i < reviewCount; i++) {
      await Review.create({
        productId: product._id,
        author: faker.person.fullName(),
        rating: faker.number.int({ min: 1, max: 5 }),
        comment: faker.lorem.sentences({ min: 1, max: 2 }),
      })
    }
  }

  console.log('✅ Seed completed!')
  await mongoose.disconnect()
}

seed().catch((err) => {
  console.error(err)
  process.exit(1)
})
