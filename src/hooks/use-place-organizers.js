"use client";
import { useState, useEffect } from "react";
import { fetchPlaceOrganizers } from "@/services/fetch-place-organizers";

export function usePlaceOrganizers(placeId, token, limit = 10) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldShowSkeleton = loading && !data;

  useEffect(() => {
    async function loadPlaceOrganizers() {
      if (!placeId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const organizersData = await fetchPlaceOrganizers(
          placeId,
          token,
          limit
        );
        setData(organizersData);
      } catch (err) {
        setError(
          err.message || "Erreur lors du chargement des organisateurs du lieu"
        );
        setData(null);
      } finally {
        setLoading(false);
      }
    }

    loadPlaceOrganizers();
  }, [placeId, token, limit]);

  return {
    data,
    organizers: data?._embedded?.userResponses || [],
    loading: shouldShowSkeleton,
    error,
  };
}
