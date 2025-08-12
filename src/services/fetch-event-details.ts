import { EventDetails } from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const fetchEventDetails = async (
  eventId: string | number
): Promise<EventDetails> => {
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
};
