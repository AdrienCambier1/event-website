import { CurrentUserResponse, UserByIdResponse } from "@/types/user";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchCurrentUser(
  token: string
): Promise<CurrentUserResponse> {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const statusErrors = {
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Utilisateur non trouvé",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de récupérer le profil utilisateur`;

      throw new Error(errorMessage);
    }

    const data: CurrentUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current user:", error);
    throw error;
  }
}

export async function fetchUserById(
  userId: string | number,
  token?: string
): Promise<UserByIdResponse> {
  try {
    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(`${API_URL}/users/${userId}`, {
      method: "GET",
      headers,
    });

    if (!response.ok) {
      const statusErrors = {
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Utilisateur non trouvé",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de récupérer le profil utilisateur`;

      throw new Error(errorMessage);
    }

    const data: UserByIdResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    throw error;
  }
}
