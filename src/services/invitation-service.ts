const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:8090/api/v1";

export async function createInvitation(
  eventId: number,
  userId: number,
  token?: string,
  description?: string
) {
  const res = await fetch(`${API_URL}/invitations`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    },
    body: JSON.stringify({ eventId, userId, description }),
  });
  if (!res.ok) {
    throw new Error("Erreur lors de l'envoi de l'invitation");
  }
  return await res.json();
}
