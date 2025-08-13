"use client";
import { useState, useEffect } from "react";
import { fetchEvents } from "@/services/fetch-events";

export function useEvents(token, page = 0, size = 10) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldShowSkeleton = loading || error !== null;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventsData = await fetchEvents(token, page, size);
        setEvents(eventsData._embedded?.eventSummaryResponses || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setEvents([]);
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
      const eventsData = await fetchEvents(token, page, size);
      setEvents(eventsData._embedded?.eventSummaryResponses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return { events, loading: shouldShowSkeleton, error, refetch };
}
