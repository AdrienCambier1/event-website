"use client";
import { useState, useEffect } from "react";
import { fetchCityEvents } from "@/services/fetch-city-events";

export function useCityEvents(
  cityId,
  page = 0,
  size = 10,
  sort = "createdAt,desc"
) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCityEvents() {
      if (!cityId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const eventsData = await fetchCityEvents(cityId, page, size, sort);
        setData(eventsData);
      } catch (err) {
        setError(
          err.message || "Erreur lors du chargement des événements de la ville"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadCityEvents();
  }, [cityId, page, size, sort]);

  return {
    data,
    events: data?._embedded?.eventSummaryResponses || [],
    loading,
    error,
    pagination: data?.page,
  };
}
