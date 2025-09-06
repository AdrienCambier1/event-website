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
  try {
    const response = await fetch(`${API_URL}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(reviewData),
    });

    if (!response.ok) {
      const statusErrors = {
        400: "Données d'avis invalides",
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Utilisateur non trouvé",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de créer l'avis`;

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating review:", error);
    throw error;
  }
}


export async function deleteReview(
  reviewId: string | number,
  token: string
): Promise<void> {
  try {
    const response = await fetch(`${API_URL}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const statusErrors = {
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Avis non trouvé",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de supprimer l'avis`;

      throw new Error(errorMessage);
    }
  } catch (error) {
    console.error("Error deleting review:", error);
    throw error;
  }
}
