import { EventsApiResponse } from "@/types/event";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPlaceEvents(
  placeId: string | number,
  size: number = 10
): Promise<EventsApiResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/places/${placeId}/events?size=${size}&sort=createdAt,desc`,
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
