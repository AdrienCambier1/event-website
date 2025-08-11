"use client";
import { useState, useEffect } from "react";
import { fetchCities } from "@/services/fetch-cities";

export function useCities(page = 0, size = 20) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const cities = await fetchCities(page, size);
        console.log("Cities API Response:", cities); // Debug
        setData(cities);
      } catch (err) {
        console.error("Cities API Error:", err); // Debug
        setError(err instanceof Error ? err.message : "Erreur inconnue");
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
      const cities = await fetchCities(page, size);
      setData(cities);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return { data, loading, error, refetch };
}
