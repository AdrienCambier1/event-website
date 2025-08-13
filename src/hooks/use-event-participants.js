import { useState, useEffect } from "react";
import { fetchEventParticipants } from "@/services/fetch-events";

export function useEventParticipants(eventId, token, shouldFetch = false) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch || !eventId) {
      return;
    }

    const loadParticipants = async () => {
      try {
        setLoading(true);
        setError(null);
        const participantsData = await fetchEventParticipants(eventId, token);
        setParticipants(participantsData._embedded?.userSummaries || []);
      } catch (err) {
        console.error("Error in useEventParticipants:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    loadParticipants();
  }, [eventId, token, shouldFetch]);

  const refetch = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);
      const participantsData = await fetchEventParticipants(eventId, token);
      setParticipants(participantsData._embedded?.userSummaries || []);
    } catch (err) {
      console.error("Error in useEventParticipants refetch:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setParticipants([]);
    } finally {
      setLoading(false);
    }
  };

  return { participants, loading, error, refetch };
}
