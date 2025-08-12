"use client";
import { useState, useEffect } from "react";
import { fetchCityDetails } from "@/services/fetch-city-details";

export function useCityDetails(cityId) {
  const [city, setCity] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadCityDetails() {
      if (!cityId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const cityData = await fetchCityDetails(cityId);
        setCity(cityData);
      } catch (err) {
        setError(
          err.message || "Erreur lors du chargement des détails de la ville"
        );
        setCity(null);
      } finally {
        setLoading(false);
      }
    }

    loadCityDetails();
  }, [cityId]);

  return {
    city,
    loading,
    error,
  };
}
