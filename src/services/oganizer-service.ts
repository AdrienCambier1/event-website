import { OrganizersApiResponse } from "@/types/organizer";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
export async function fetchOrganizers(
  size: number = 10
): Promise<OrganizersApiResponse> {
  try {
    const response = await fetch(
      `${API_URL}/users/organizers?size=${size}&sort=id,asc`,
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
    console.error("Erreur lors de la récupération des organisateurs:", error);
    throw error;
  }
}
