"use client";
import { useState, useEffect } from "react";
import { fetchEvents } from "@/services/fetch-events";

export function useEvents(token, page = 0, size = 10) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const events = await fetchEvents(token, page, size);
        setData(events);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [token, page, size]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const events = await fetchEvents(token, page, size);
      setData(events);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
