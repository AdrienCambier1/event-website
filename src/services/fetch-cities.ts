import { CitiesApiResponse } from "@/types/city";

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
