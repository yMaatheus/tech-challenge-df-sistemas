import type { IProduct } from "@/common";
import { api } from "@/lib/api";

export async function fetchProducts() {
  const response = await api.get("products");

  const data = await response.json<IProduct[]>();
  
  return data;
}
