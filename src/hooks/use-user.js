"use client";
import { fetchCurrentUserOrdersWithEvents } from "@/services/user-service";
import { useState, useEffect } from "react";
import {
  fetchCurrentUser,
  fetchUserById,
  fetchUserEvents,
  fetchUserParticipatingEvents,
  updateCurrentUser,
} from "@/services/user-service";

export function useCurrentUser(token) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      setError(null);
      return null;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await fetchCurrentUser(token);
      setUser(userData);
      return userData;
    } catch (err) {
      console.error("Error in useCurrentUser:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setUser(null);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const refetch = async () => {
    return await fetchData();
  };

  return {
    user,
    loading,
    error,
    refetch,
  };
}

export function useUserById(userId, token = null) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!userId) {
      setUser(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await fetchUserById(userId, token);
      setUser(userData);
    } catch (err) {
      console.error("Error in useUserById:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [userId, token]);

  const refetch = async () => {
    return await fetchData();
  };

  return {
    user,
    loading,
    error,
    refetch,
  };
}

export function useUserEvents(userId, token, page = 0, size = 10) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldShowSkeleton = loading && events.length === 0;

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
        setEvents(eventsData._embedded?.eventSummaryResponses || []);
      } catch (err) {
        console.error("Error in useUserEvents:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        setEvents([]);
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
      setEvents(eventsData._embedded?.eventSummaryResponses || []);
    } catch (err) {
      console.error("Error in useUserEvents refetch:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading: shouldShowSkeleton,
    error,
    refetch,
  };
}

export function useUserParticipatingEvents(userId, token, page = 0, size = 10) {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldShowSkeleton = loading && events.length === 0;

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
        setEvents(eventsData._embedded?.eventSummaryResponses || []);
      } catch (err) {
        console.error("Error in useUserParticipatingEvents:", err);
        setError(
          err instanceof Error ? err.message : "Une erreur est survenue"
        );
        setEvents([]);
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
      setEvents(eventsData._embedded?.eventSummaryResponses || []);
    } catch (err) {
      console.error("Error in useUserParticipatingEvents refetch:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setEvents([]);
    } finally {
      setLoading(false);
    }
  };

  return {
    events,
    loading: shouldShowSkeleton,
    error,
    refetch,
  };
}

export function useCurrentUserOrdersWithEvents(token) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!token) {
      setOrders([]);
      setLoading(false);
      setError(null);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const enrichedOrders = await fetchCurrentUserOrdersWithEvents(token);
      setOrders(enrichedOrders);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const refetch = async () => {
    return await fetchData();
  };

  return {
    orders,
    loading,
    error,
    refetch,
  };
}

export function useUpdateCurrentUser(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const updateUser = async (updateData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const updatedUser = await updateCurrentUser(token, updateData);
      setData(updatedUser);
      setSuccess(true);
      return updatedUser;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { updateUser, loading, error, success, data };
}
