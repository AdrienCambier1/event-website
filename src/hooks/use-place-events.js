"use client";
import { useState, useEffect } from "react";
import { fetchPlaceEvents } from "@/services/fetch-place-events";

export function usePlaceEvents(placeId, size = 10) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldShowSkeleton = loading && events.length === 0;

  useEffect(() => {
    async function loadPlaceEvents() {
      if (!placeId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const response = await fetchPlaceEvents(placeId, size);
        setEvents(response._embedded?.eventSummaryResponses || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des événements du lieu"
        );
        setEvents([]);
      } finally {
        setLoading(false);
      }
    }

    loadPlaceEvents();
  }, [placeId, size]);

  return {
    events,
    loading: shouldShowSkeleton,
    error,
  };
}
