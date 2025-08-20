"use client";
import { useState, useEffect } from "react";
import {
  fetchCities,
  fetchCityDetails,
  fetchCityEvents,
  fetchCityOrganizers,
  fetchCityPlaces,
} from "@/services/city-service";

export function useCities(page = 0, size = 20, sort = null) {
  const [cities, setCities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadCities = async () => {
      try {
        setLoading(true);
        setError(null);
        const citiesData = await fetchCities(page, size, sort);
        setCities(citiesData._embedded?.cityResponses || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setCities([]);
      } finally {
        setLoading(false);
      }
    };

    loadCities();
  }, [page, size, sort]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const citiesData = await fetchCities(page, size, sort);
      setCities(citiesData._embedded?.cityResponses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setCities([]);
    } finally {
      setLoading(false);
    }
  };

  return { cities, loading, error, refetch };
}

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

export function useCityOrganizers(cityId, limit = 10, sort = null) {
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
        const organizersData = await fetchCityOrganizers(cityId, limit, sort);
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
  }, [cityId, limit, sort]);

  return {
    data,
    organizers: data?._embedded?.userResponses || [],
    loading,
    error,
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
