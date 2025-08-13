import { PlacesApiResponse } from "@/types/place";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPlaces(
  page = 0,
  size = 10,
  sort = "name,asc"
): Promise<PlacesApiResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sort: sort,
    });

    const response = await fetch(`${API_URL}/places?${params}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      const statusErrors = {
        404: "Aucun lieu trouvé",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de récupérer les lieux`;

      throw new Error(errorMessage);
    }

    const data: PlacesApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching places:", error);
    throw error;
  }
}

export async function fetchCityPlaces(
  cityId: string | number,
  limit = 10
): Promise<PlacesApiResponse> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });

    const response = await fetch(
      `${API_URL}/cities/${cityId}/places?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const statusErrors = {
        404: "Aucun lieu trouvé pour cette ville",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de récupérer les lieux de la ville`;

      throw new Error(errorMessage);
    }

    const data: PlacesApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching city places:", error);
    throw error;
  }
}
