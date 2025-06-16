import { Product, ProductDocument } from '@interface/mongoose/schemas/product.schema'

export interface ProductRepository {
  create(data: Partial<Product>): Promise<ProductDocument>;
  findAll(): Promise<Product[]>;
  findById(id: string): Promise<Product | null>;
  update(id: string, data: Partial<Product>): Promise<Product | null>;
  remove(id: string): Promise<Product | null>;
}
