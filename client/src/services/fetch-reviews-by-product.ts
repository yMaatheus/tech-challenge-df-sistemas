import type { IReview } from "@/common";
import { api } from "@/lib/api";

export async function fetchReviewsByProductId(productId: string): Promise<IReview[]> {
  const response = await api.get(`reviews/product/${productId}`);

  const data = await response.json<IReview[]>();

  return data;
}
