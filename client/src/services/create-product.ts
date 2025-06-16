import type { IProduct } from "@/common";
import { api } from "@/lib/api";

interface CreateProductParams {
  name: string;
  description: string;
  price: number;
  category: string;
}

export async function createProduct(product: CreateProductParams) {
  const response = await api.post('products', {
    json: product
  });

  const data = await response.json<IProduct>();

  return data;
}
