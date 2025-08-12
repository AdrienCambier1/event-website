import { EventsApiResponse } from "@/types/event";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

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

  const res = await fetch(`${API_BASE_URL}/cities/${cityId}/events?${params}`, {
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
