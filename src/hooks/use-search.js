import { useState, useCallback } from "react";
import { search } from "@/services/search-service";

export function useSearch() {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const doSearch = useCallback(async (query) => {
    setLoading(true);
    setError(null);
    try {
      const data = await search(query);
      setResults(data);
    } catch (err) {
      setError(err.message || "Erreur inconnue");
      setResults(null);
    } finally {
      setLoading(false);
    }
  }, []);

  return { results, loading, error, search: doSearch };
}
