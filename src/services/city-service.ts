import { CitiesApiResponse } from "@/types/city";
import { EventsApiResponse } from "@/types/event";
import { CityOrganizersResponse } from "@/types/organizer";
import { PlacesApiResponse } from "@/types/place";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCities(
  page = 0,
  size = 20
): Promise<CitiesApiResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  const res = await fetch(`${API_URL}/cities?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des villes");
  }

  return await res.json();
}

export async function fetchCityDetails(cityId) {
  try {
    const response = await fetch(`${API_URL}/cities/${cityId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des détails de la ville:",
      error
    );
    throw error;
  }
}

export async function fetchCityEvents(
  cityId: string | number,
  page = 0,
  size = 10,
  sort = "createdAt,desc"
): Promise<EventsApiResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
    sort: sort,
  });

  const res = await fetch(`${API_URL}/cities/${cityId}/events?${params}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des événements de la ville");
  }

  return await res.json();
}

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
