import { CityOrganizersResponse } from "@/types/organizer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCityOrganizers(
  cityId: string | number,
  token?: string,
  limit = 10
): Promise<CityOrganizersResponse> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(
      `${API_URL}/cities/${cityId}/organizers?${params}`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      const statusErrors = {
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Ville non trouvée",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de récupérer les organisateurs`;

      throw new Error(errorMessage);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching city organizers:", error);
    throw error;
  }
}
