"use client";
import { useState, useEffect } from "react";
import { fetchCityOrganizers } from "@/services/fetch-city-organizers";

export function useCityOrganizers(cityId, token, limit = 10) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCityOrganizers() {
      if (!cityId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const organizersData = await fetchCityOrganizers(cityId, token, limit);
        setData(organizersData);
      } catch (err) {
        setError(
          err.message ||
            "Erreur lors du chargement des organisateurs de la ville"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadCityOrganizers();
  }, [cityId, token, limit]);

  return {
    data,
    organizers: data?._embedded?.userResponses || [],
    loading,
    error,
  };
}
