import { PlacesApiResponse } from "@/types/place";
import { Place } from "@/types/place";
import { EventsApiResponse } from "@/types/event";
import { CityOrganizersResponse } from "@/types/organizer";

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

export async function fetchPlaceDetails(
  placeId: string | number
): Promise<Place> {
  try {
    const response = await fetch(`${API_URL}/places/${placeId}`, {
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
    console.error("Erreur lors de la récupération des détails du lieu:", error);
    throw error;
  }
}

export async function fetchPlaceEvents(
  placeId: string | number,
  size: number = 10
): Promise<EventsApiResponse> {
  try {
    const response = await fetch(
      `${API_URL}/places/${placeId}/events?size=${size}&sort=createdAt,desc`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Erreur HTTP: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des événements du lieu:",
      error
    );
    throw error;
  }
}

export async function fetchPlaceOrganizers(
  placeId: string | number,
  limit = 10
): Promise<CityOrganizersResponse> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
    });

    const response = await fetch(
      `${API_URL}/places/${placeId}/organizers?${params}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const statusErrors = {
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Lieu non trouvé",
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
    console.error("Error fetching place organizers:", error);
    throw error;
  }
}
