import { api } from "@/lib/api";

export async function deleteReview(reviewId: string) {
  const response = await api.delete(`reviews/${reviewId}`);

  return response.ok;
}
