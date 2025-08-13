import { Category } from "@/types/organizer";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface OrganizerResponse {
  id: number;
  lastName: string;
  firstName: string;
  pseudo: string;
  eventPastCount: number;
  eventsCount: number;
  role: string;
  description: string | null;
  imageUrl: string | null;
  bannerUrl: string | null;
  socials: any[];
  categories: Category[];
  note: number | null;
  _links?: any;
}

export interface OrganizersApiResponse {
  _embedded: {
    organizerResponses: OrganizerResponse[];
  };
  _links?: any;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export async function fetchOrganizers(
  size: number = 10
): Promise<OrganizersApiResponse> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/organizers?size=${size}&sort=id,asc`,
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
