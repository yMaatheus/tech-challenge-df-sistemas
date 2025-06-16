import type { IProduct } from "@/common";
import { api } from "@/lib/api";

export async function fetchProductById(productId: string): Promise<IProduct> {
  const response = await api.get(`products/${productId}`);

  const data = await response.json<IProduct>();

  return data;
}
