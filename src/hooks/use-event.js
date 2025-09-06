"use client";
import { useState, useEffect } from "react";
import {
  fetchEvents,
  fetchEventDetails,
  fetchEventParticipants,
  addEventParticipants,
  createEventReport,
  fetchEventPlace,
  fetchTrendingEvents,
} from "@/services/event-service";

export function useEvents(page = 0, size = 10) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventsData = await fetchEvents(page, size);
        setEvents(eventsData._embedded?.eventSummaryResponses || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [page, size]);

  return { events, loading, error };
}

export function useEventDetails(eventId) {
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!eventId) {
      setEvent(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const data = await fetchEventDetails(eventId);
      setEvent(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  return {
    event,
    loading,
    error,
  };
}

export function useEventParticipants(eventId, shouldFetch = false) {
  const [participants, setParticipants] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!shouldFetch || !eventId) {
      return;
    }

    const loadParticipants = async () => {
      try {
        setLoading(true);
        setError(null);
        const participantsData = await fetchEventParticipants(eventId);
        setParticipants(participantsData._embedded?.userSummaries || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    loadParticipants();
  }, [eventId, shouldFetch]);

  return { participants, loading, error };
}

export function useAddEventParticipants() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const addParticipants = async (eventId, userIds, token) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await addEventParticipants(eventId, userIds, token);
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addParticipants, loading, error, data };
}

export function useEventReport(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const sendReport = async (report) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await createEventReport(report, token);
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { sendReport, loading, error, data };
}

export function useEventWithPlaceDetails(eventId) {
  const {
    event,
    loading: eventLoading,
    error: eventError,
  } = useEventDetails(eventId);
  const [place, setPlace] = useState(null);
  const [placeLoading, setPlaceLoading] = useState(false);
  const [placeError, setPlaceError] = useState(null);

  useEffect(() => {
    if (!eventId) return;
    const fetchPlaceData = async () => {
      setPlaceLoading(true);
      setPlaceError(null);
      try {
        const data = await fetchEventPlace(eventId);
        setPlace(data);
      } catch (err) {
        setPlaceError(err instanceof Error ? err.message : "Erreur inconnue");
        setPlace(null);
      } finally {
        setPlaceLoading(false);
      }
    };
    fetchPlaceData();
  }, [eventId]);

  const loading = eventLoading || placeLoading;
  const error = eventError || placeError;

  return {
    event,
    place,
    loading,
    error,
  };
}

export function useTrendingEvents() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTrending = async () => {
      try {
        setLoading(true);
        setError(null);
        const data = await fetchTrendingEvents();
        setEvents(data._embedded?.eventSummaryResponses || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    loadTrending();
  }, []);

  return { events, loading, error };
}
