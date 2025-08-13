import { Place } from "@/types/place";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchPlaceDetails(
  placeId: string | number
): Promise<Place> {
  try {
    const response = await fetch(`${API_BASE_URL}/places/${placeId}`, {
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
