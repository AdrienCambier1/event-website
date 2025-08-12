import { useState, useEffect } from "react";
import {
  fetchUserEvents,
  fetchUserParticipatingEvents,
} from "@/services/fetch-user-events";

export function useUserEvents(userId, token, page = 0, size = 10) {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      if (!userId) {
        setEvents(null);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const eventsData = await fetchUserEvents(userId, token, page, size);
        setEvents(eventsData);
      } catch (err) {
        console.error("Error in useUserEvents:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        setEvents(null);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [userId, token, page, size]);

  const refetch = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const eventsData = await fetchUserEvents(userId, token, page, size);
      setEvents(eventsData);
    } catch (err) {
      console.error("Error in useUserEvents refetch:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setEvents(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    refetch,
  };
}

export function useUserParticipatingEvents(userId, token, page = 0, size = 10) {
  const [events, setEvents] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadEvents = async () => {
      if (!userId) {
        setEvents(null);
        setLoading(false);
        setError(null);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        const eventsData = await fetchUserParticipatingEvents(
          userId,
          token,
          page,
          size
        );
        setEvents(eventsData);
      } catch (err) {
        console.error("Error in useUserParticipatingEvents:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        setEvents(null);
      } finally {
        setLoading(false);
      }
    };

    loadEvents();
  }, [userId, token, page, size]);

  const refetch = async () => {
    if (!userId) return;

    try {
      setLoading(true);
      setError(null);
      const eventsData = await fetchUserParticipatingEvents(
        userId,
        token,
        page,
        size
      );
      setEvents(eventsData);
    } catch (err) {
      console.error("Error in useUserParticipatingEvents refetch:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setEvents(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading,
    error,
    refetch,
  };
}
