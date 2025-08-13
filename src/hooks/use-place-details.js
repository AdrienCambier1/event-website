"use client";
import { useState, useEffect } from "react";
import { fetchPlaceDetails } from "@/services/fetch-place-details";

export function usePlaceDetails(placeId) {
  const [place, setPlace] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlaceDetails() {
      if (!placeId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const placeData = await fetchPlaceDetails(placeId);
        setPlace(placeData);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des détails du lieu"
        );
        setPlace(null);
      } finally {
        setLoading(false);
      }
    }

    loadPlaceDetails();
  }, [placeId]);

  return {
    place,
    loading,
    error,
  };
}
