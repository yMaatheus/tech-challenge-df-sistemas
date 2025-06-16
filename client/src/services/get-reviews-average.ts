import { api } from "@/lib/api";

export type getReviewsAverageResponse = {
  average: number
}

export async function getReviewsAverage(productId: string) {
  const response = await api.get(`reviews/product/${productId}/average`)

  const data = response.json<getReviewsAverageResponse>()

  return data;
}