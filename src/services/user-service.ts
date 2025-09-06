import {
  CurrentUserResponse,
  UserByIdResponse,
  UserOrdersResponse,
  UserUpdateRequest,
  OrderData,
  TicketData,
} from "@/types/user";
import { EventsApiResponse } from "@/types/event";

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

export async function fetchUserEvents(
  userId: string | number,
  token?: string,
  page = 0,
  size = 10
): Promise<EventsApiResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(
      `${API_URL}/users/${userId}/events?${params}`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      const statusErrors = {
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Utilisateur non trouvé",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de récupérer les événements`;

      throw new Error(errorMessage);
    }

    const data: EventsApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user events:", error);
    throw error;
  }
}

export async function fetchUserParticipatingEvents(
  userId: string | number,
  token?: string,
  page = 0,
  size = 10
): Promise<EventsApiResponse> {
  try {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
    });

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };

    const response = await fetch(
      `${API_URL}/users/${userId}/participating-events?${params}`,
      {
        method: "GET",
        headers,
      }
    );

    if (!response.ok) {
      const statusErrors = {
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Utilisateur non trouvé",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de récupérer les événements de participation`;

      throw new Error(errorMessage);
    }

    const data: EventsApiResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user participating events:", error);
    throw error;
  }
}

export async function fetchCurrentUserOrders(
  token: string
): Promise<UserOrdersResponse> {
  try {
    const response = await fetch(`${API_URL}/users/me/orders`, {
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
        404: "Commandes non trouvées",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de récupérer les commandes`;

      throw new Error(errorMessage);
    }

    const data: UserOrdersResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching current user orders:", error);
    throw error;
  }
}

async function fetchOrderEvent(orderId: string | number, token: string) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const response = await fetch(`${API_URL}/orders/${orderId}/events`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(
      `Erreur lors de la récupération de l'événement pour la commande ${orderId}`
    );
  }
  const data = await response.json();
  return data._embedded?.eventResponses?.[0] || null;
}

export async function fetchCurrentUserOrdersWithEvents(token: string) {
  const ordersData = await fetchCurrentUserOrders(token);
  const orders = ordersData._embedded?.orderResponses || [];
  const enrichedOrders = await Promise.all(
    orders.map(async (order) => {
      let event = null;
      try {
        event = await fetchOrderEvent(order.id, token);
      } catch (e) {
        console.error(e);
      }
      return { order, event };
    })
  );
  return enrichedOrders;
}

export async function updateCurrentUser(
  token: string,
  updateData: UserUpdateRequest
): Promise<CurrentUserResponse> {
  try {
    const response = await fetch(`${API_URL}/users/me`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updateData),
    });

    if (!response.ok) {
      const statusErrors = {
        400: "Requête invalide",
        401: "Token invalide ou expiré",
        403: "Accès non autorisé",
        404: "Utilisateur non trouvé",
        500: "Erreur serveur, veuillez réessayer",
      };

      const errorMessage =
        statusErrors[response.status] ||
        `Erreur ${response.status}: Impossible de mettre à jour l'utilisateur`;
      throw new Error(errorMessage);
    }

    const data: CurrentUserResponse = await response.json();
    return data;
  } catch (error) {
    console.error("Error updating current user:", error);
    throw error;
  }
}

export async function postOrder(
  orderData: OrderData,
  token?: string
): Promise<any> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(orderData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(
        error.error || `Erreur lors de la création de la commande`
      );
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting order:", error);
    throw error;
  }
}

export async function postTicket(
  orderId: number,
  ticketData: TicketData,
  token?: string
): Promise<any> {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  try {
    const response = await fetch(`${API_URL}/orders/${orderId}/tickets`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Bearer ${token}` }),
      },
      body: JSON.stringify(ticketData),
    });
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `Erreur lors de la création du ticket`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error posting ticket:", error);
    throw error;
  }
}
