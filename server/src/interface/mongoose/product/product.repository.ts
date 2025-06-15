import { Product } from '@interface/mongoose/schemas/product.schema'
import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'

@Injectable()
export class ProductRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<Product>,
  ) {}

  async create(data: Partial<Product>): Promise<Product> {
    return this.productModel.create(data)
  }

  async findAll(): Promise<Product[]> {
    return this.productModel.find().exec()
  }

  async findById(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec()
  }

  async update(id: string, data: Partial<Product>): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, data, { new: true }).exec()
  }

  async remove(id: string): Promise<Product | null> {
    return this.productModel.findByIdAndDelete(id).exec()
  }
}
