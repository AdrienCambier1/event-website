"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ParametresContext = createContext(null);

export function ParametresProvider({ children }) {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [accountError, setAccountError] = useState(null);

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    accountError,
    setAccountError,
  };

  return (
    <ParametresContext.Provider value={value}>
      {children}
    </ParametresContext.Provider>
  );
}

export function useParametres() {
  const context = useContext(ParametresContext);
  if (context === null) {
    throw new Error("useParametres must be used within a ParametresProvider");
  }
  return context;
}
