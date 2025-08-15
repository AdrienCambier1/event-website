"use client";
import { createContext, useContext, useState } from "react";

const SearchModalContext = createContext();

export function SearchModalProvider({ children }) {
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const openSearchModal = () => setIsSearchModalOpen(true);
  const closeSearchModal = () => setIsSearchModalOpen(false);
  const toggleSearchModal = () => setIsSearchModalOpen((prev) => !prev);

  const value = {
    isSearchModalOpen,
    openSearchModal,
    closeSearchModal,
    toggleSearchModal,
  };

  return (
    <SearchModalContext.Provider value={value}>
      {children}
    </SearchModalContext.Provider>
  );
}

export function useSearchModal() {
  const context = useContext(SearchModalContext);
  if (!context) {
    throw new Error("useSearchModal must be used within a SearchModalProvider");
  }
  return context;
}
