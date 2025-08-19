"use client";
import { useState, useEffect } from "react";
import {
  fetchPlaces,
  fetchPlaceDetails,
  fetchPlaceEvents,
  fetchPlaceOrganizers,
} from "@/services/place-service";

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

export function usePlaceEvents(placeId, size = 10) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
    loading,
    error,
  };
}

export function usePlaceOrganizers(placeId, limit = 10) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadPlaceOrganizers() {
      if (!placeId) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const organizersData = await fetchPlaceOrganizers(placeId, limit);
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
  }, [placeId, limit]);

  return {
    data,
    organizers: data?._embedded?.userResponses || [],
    loading,
    error,
  };
}
