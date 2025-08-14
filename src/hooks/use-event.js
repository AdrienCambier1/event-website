"use client";
import { useState, useEffect } from "react";
import {
  fetchEvents,
  fetchEventDetails,
  fetchEventParticipants,
  addEventParticipants,
} from "@/services/event-service";

export function useEvents(token, page = 0, size = 10) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldShowSkeleton = loading || error !== null;

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setLoading(true);
        setError(null);
        const eventsData = await fetchEvents(token, page, size);
        setEvents(eventsData._embedded?.eventSummaryResponses || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [token, page, size]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const eventsData = await fetchEvents(token, page, size);
      setEvents(eventsData._embedded?.eventSummaryResponses || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return { events, loading: shouldShowSkeleton, error, refetch };
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
      console.error("Error in useEventDetails:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [eventId]);

  const refetch = async () => {
    await fetchData();
  };

  return {
    event,
    loading,
    error,
    refetch,
  };
}

export function useEventParticipants(eventId, token, shouldFetch = false) {
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
        const participantsData = await fetchEventParticipants(eventId, token);
        setParticipants(participantsData._embedded?.userSummaries || []);
      } catch (err) {
        console.error("Error in useEventParticipants:", err);
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setParticipants([]);
      } finally {
        setLoading(false);
      }
    };

    loadParticipants();
  }, [eventId, token, shouldFetch]);

  const refetch = async () => {
    if (!eventId) return;

    try {
      setLoading(true);
      setError(null);
      const participantsData = await fetchEventParticipants(eventId, token);
      setParticipants(participantsData._embedded?.userSummaries || []);
    } catch (err) {
      console.error("Error in useEventParticipants refetch:", err);
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setParticipants([]);
    } finally {
      setLoading(false);
    }
  };

  return { participants, loading, error, refetch };
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
