import type { IReview } from "@/common";
import { api } from "@/lib/api";

interface CreateReviewParams {
  productId: string;
  author: string;
  rating: number;
  comment: string;
}

export async function createReview(review: CreateReviewParams) {
  const response = await api.post('reviews', {
    json: review
  });

  const data = await response.json<IReview>();

  return data;
}
