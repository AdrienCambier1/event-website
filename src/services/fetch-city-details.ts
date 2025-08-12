const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCityDetails(cityId) {
  try {
    const response = await fetch(`${API_BASE_URL}/cities/${cityId}`, {
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
