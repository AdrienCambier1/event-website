"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import { search } from "@/services/search-service";

export function useSearch(debounceDelay = 500) {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const debounceTimeout = useRef();

  const doSearch = useCallback(
    (query) => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
      setLoading(true);
      setError(null);
      debounceTimeout.current = setTimeout(async () => {
        try {
          const data = await search(query);
          setResults(data);
        } catch (err) {
          setError(err.message || "Erreur inconnue");
          setResults(null);
        } finally {
          setLoading(false);
        }
      }, debounceDelay);
    },
    [debounceDelay]
  );

  useEffect(() => {
    return () => {
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, []);

  return { results, loading, error, search: doSearch };
}
