"use client";
import { createContext, useContext } from "react";

const ParametresContext = createContext(null);

export function ParametresProvider({
  children,
  user,
  isLoading,
  accountError,
}) {
  const value = {
    user,
    isLoading,
    accountError,
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
