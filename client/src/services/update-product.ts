import type { IProduct } from "@/common";
import { api } from "@/lib/api";

interface UpdateProductParams {
  name?: string;
  description?: string;
  price?: number;
  category?: string;
}

export async function updateProduct(productId: string, product: UpdateProductParams) {
  const response = await api.patch(`products/${productId}`, {
    json: product
  });

  const data = await response.json<IProduct>();

  return data;
}
