"use client";
import { useState, useEffect } from "react";
import { fetchOrganizers } from "@/services/oganizer-service";

export function useOrganizers(size = 10) {
  const [organizers, setOrganizers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadOrganizers() {
      try {
        setLoading(true);
        setError(null);
        const response = await fetchOrganizers(size);
        setOrganizers(response._embedded?.organizerResponses || []);
      } catch (err) {
        setError(
          err instanceof Error
            ? err.message
            : "Erreur lors du chargement des organisateurs"
        );
        setOrganizers([]);
      } finally {
        setLoading(false);
      }
    }

    loadOrganizers();
  }, [size]);

  return {
    organizers,
    loading,
    error,
  };
}
