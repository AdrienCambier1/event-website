"use client";
import { useState, useCallback } from "react";
import { useSearchParams } from "next/navigation";

export function useUrlFilters() {
  const searchParams = useSearchParams();
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInitialized, setIsInitialized] = useState(false);

  const initializeFromURL = useCallback(
    (filterOptions) => {
      if (isInitialized || !filterOptions.length) return;

      const themeParam = searchParams.get("theme");
      const searchParam = searchParams.get("search");

      if (themeParam) {
        const themeExists = filterOptions.some(
          (option) => option.value === themeParam
        );
        if (themeExists) {
          setSelectedFilters([themeParam]);
        }
      }

      if (searchParam) {
        setSearchTerm(searchParam);
      }

      setIsInitialized(true);
    },
    [searchParams, isInitialized]
  );

  const addFilter = useCallback((filterValue) => {
    setSelectedFilters((prev) => [...prev, filterValue]);
  }, []);

  const removeFilter = useCallback((filterValue) => {
    setSelectedFilters((prev) =>
      prev.filter((filter) => filter !== filterValue)
    );
  }, []);

  const updateSearch = useCallback((search) => {
    setSearchTerm(search);
  }, []);

  const clearAll = useCallback(() => {
    setSelectedFilters([]);
    setSearchTerm("");
  }, []);

  return {
    selectedFilters,
    searchTerm,
    isInitialized,
    initializeFromURL,
    addFilter,
    removeFilter,
    updateSearch,
    clearAll,
  };
}
