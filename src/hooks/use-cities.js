"use client";
import { useState, useEffect } from "react";
import { fetchCities } from "@/services/fetch-cities";

export function useCities(page = 0, size = 20) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldShowSkeleton = loading && cities.length === 0;

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const citiesData = await fetchCities(page, size);
        console.log("Cities API Response:", citiesData);
        setCities(citiesData._embedded?.cityResponses || []);
      } catch (err) {
        console.error("Cities API Error:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, [page, size]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const citiesData = await fetchCities(page, size);
      setCities(citiesData._embedded?.cityResponses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  return { cities, loading: shouldShowSkeleton, error, refetch };
}
