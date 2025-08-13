import { useState, useEffect } from "react";
import { fetchCurrentUser, fetchUserById } from "@/services/fetch-user";

export function useCurrentUser(token) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    if (!token) {
      setUser(null);
      setLoading(false);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const userData = await fetchCurrentUser(token);
      setUser(userData);
    } catch (err) {
      console.error("Error in useCurrentUser:", err);
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [token]);

  const refetch = async () => {
    await fetchData();
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
    await fetchData();
  };

  return {
    user,
    loading,
    error,
    refetch,
  };
}
