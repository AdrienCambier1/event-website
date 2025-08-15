import { useState } from "react";
import { createInvitation } from "@/services/invitation-service";

export function useInvitation() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendInvitation = async (eventId, userId, token, description) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await createInvitation(
        eventId,
        userId,
        token,
        description
      );
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendInvitation, loading, error, data };
}
