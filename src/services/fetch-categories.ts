import { CategoriesApiResponse } from "@/types/category";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCategories(): Promise<CategoriesApiResponse> {
  const res = await fetch(`${API_URL}/categories`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    throw new Error("Erreur lors du chargement des catégories");
  }

  return await res.json();
}
