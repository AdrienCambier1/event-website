import { useState, useEffect } from "react";
import { fetchEventDetails } from "@/services/fetch-event-details";

export function useEventDetails(eventId) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!eventId) {
      setEvent(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchEventDetails(eventId);
      setEvent(data);
    } catch (err) {
      console.error("Error in useEventDetails:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const refetch = async () => {
    await fetchData();
  };

  return {
    event,
    loading,
    error,
    refetch,
  };
}
