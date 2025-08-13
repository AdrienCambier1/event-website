"use client";
import { useState, useEffect } from "react";
import { fetchPlaces, fetchCityPlaces } from "@/services/fetch-places";

export function usePlaces(page = 0, size = 10, sort = "name,asc") {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadPlaces = async () => {
      try {
        setLoading(true);
        setError(null);
        const places = await fetchPlaces(page, size, sort);
        console.log("Places API Response:", places);
        setData(places);
      } catch (err) {
        console.error("Places API Error:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    loadPlaces();
  }, [page, size, sort]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const places = await fetchPlaces(page, size, sort);
      setData(places);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    places: data?._embedded?.placeResponses || [],
    loading,
    error,
    refetch,
  };
}

export function useCityPlaces(cityId, limit = 10) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCityPlaces = async () => {
      if (!cityId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const places = await fetchCityPlaces(cityId, limit);
        console.log("City Places API Response:", places);
        setData(places);
      } catch (err) {
        console.error("City Places API Error:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
      } finally {
        setLoading(false);
      }
    };

    loadCityPlaces();
  }, [cityId, limit]);

  const refetch = async () => {
    if (!cityId) return;

    try {
      setLoading(true);
      setError(null);
      const places = await fetchCityPlaces(cityId, limit);
      setData(places);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
    } finally {
      setLoading(false);
    }
  };

  return {
    data,
    places: data?._embedded?.placeResponses || [],
    loading,
    error,
    refetch,
  };
}
