import { EventsApiResponse, EventParticipantsApiResponse } from "@/types/event";
import { EventDetails } from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function fetchEvents(
  token?: string,
  page = 0,
  size = 10
): Promise<EventsApiResponse> {
  const params = new URLSearchParams({
    page: page.toString(),
    size: size.toString(),
  });

  const res = await fetch(`${API_URL}/events?${params}`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok) throw new Error("Erreur lors du chargement des événements");
  return await res.json();
}

export async function fetchUserEvents(
  userEventsUrl: string,
  token?: string,
  page = 0,
  size = 10
): Promise<EventsApiResponse> {
  const url = new URL(userEventsUrl);
  url.searchParams.set("page", page.toString());
  url.searchParams.set("size", size.toString());

  const res = await fetch(url.toString(), {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok)
    throw new Error(
      "Erreur lors du chargement des événements de l'utilisateur"
    );
  return await res.json();
}

export async function fetchEventParticipants(
  eventId: number,
  token?: string
): Promise<EventParticipantsApiResponse> {
  const res = await fetch(`${API_URL}/events/${eventId}/participants`, {
    headers: {
      ...(token && { Authorization: `Bearer ${token}` }),
    },
  });
  if (!res.ok)
    throw new Error(
      "Erreur lors du chargement des participants de l'événement"
    );
  return await res.json();
}

export async function fetchEventDetails(
  eventId: string | number
): Promise<EventDetails> {
  try {
    const response = await fetch(`${API_URL}/events/${eventId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch event details: ${response.status}`);
    }

    const data: EventDetails = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching event details:", error);
    throw error;
  }
}

export async function addEventParticipants(
  eventId: number | string,
  userIds: number[],
  token?: string
) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const res = await fetch(`${API_URL}/events/${eventId}/participants`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ userIds }),
  });
  if (!res.ok) {
    throw new Error("Erreur lors de l'ajout des participants à l'événement");
  }
  return await res.json();
}

export async function createEventReport(
  { reportType, description, senderUserId, reportedUserId },
  token
) {
  const res = await fetch(`${API_URL}/reports`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({
      reportType,
      description,
      senderUserId,
      reportedUserId,
    }),
  });
  if (!res.ok) {
    throw new Error("Erreur lors de l'envoi du signalement");
  }
  return await res.json();
}

export async function fetchEventPlace(eventId: string | number) {
  const res = await fetch(`${API_URL}/events/${eventId}/place`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Erreur lors du chargement du lieu de l'événement");
  }
  return await res.json();
}
