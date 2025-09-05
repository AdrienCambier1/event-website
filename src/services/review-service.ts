import type {
  ReviewsApiResponse,
  CreateReviewRequest,
  Review,
} from "@/types/review";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchReviews(
  page = 0,
  size = 10
): Promise<ReviewsApiResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  const res = await fetch(`${API_URL}/reviews?${params}`);
  if (!res.ok) throw new Error("Erreur lors du chargement des avis");
  return await res.json();
}

export async function createReview(
  reviewData: CreateReviewRequest,
  token: string
): Promise<Review> {
  const response = await fetch(`${API_URL}/reviews`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(reviewData),
  });

  if (!response.ok) {
    throw new Error("Erreur lors de la création de l'avis");
  }

  return await response.json();
}
