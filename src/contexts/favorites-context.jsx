"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";

const FAVORITES_KEY = "favoriteEventIds";

const FavoritesContext = createContext(null);

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem(FAVORITES_KEY);
      setFavorites(stored ? JSON.parse(stored) : []);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites]);

  const isFavorite = useCallback(
    (eventId) => favorites.includes(eventId),
    [favorites]
  );

  const addFavorite = useCallback(
    (eventId) =>
      setFavorites((prev) =>
        prev.includes(eventId) ? prev : [...prev, eventId]
      ),
    []
  );

  const removeFavorite = useCallback(
    (eventId) => setFavorites((prev) => prev.filter((id) => id !== eventId)),
    []
  );

  const toggleFavorite = useCallback((eventId) => {
    setFavorites((prev) =>
      prev.includes(eventId)
        ? prev.filter((id) => id !== eventId)
        : [...prev, eventId]
    );
  }, []);

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        isFavorite,
        addFavorite,
        removeFavorite,
        toggleFavorite,
      }}
    >
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook pratique pour accéder au context
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error(
      "useFavorites doit être utilisé à l'intérieur de FavoritesProvider"
    );
  }
  return context;
}
