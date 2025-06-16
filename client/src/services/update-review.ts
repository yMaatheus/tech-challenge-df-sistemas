import type { IReview } from "@/common";
import { api } from "@/lib/api";

interface UpdateReviewParams {
  author: string;
  rating: number;
  comment: string;
}

export async function updateReview(reviewId: string, review: UpdateReviewParams) {
  const response = await api.patch(`reviews/${reviewId}`, {
    json: review
  });

  const data = await response.json<IReview>();

  return data;
}
