import { api } from "@/lib/api";

export async function deleteProduct(productId: string) {
  const response = await api.delete(`products/${productId}`);

  return response.ok;
}
