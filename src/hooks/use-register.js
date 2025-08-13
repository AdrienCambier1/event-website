"use client";
import { useState } from "react";
import { registerUser } from "@/services/auth-service";

export function useRegister() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);

      const apiData = {
        firstName: userData.firstName,
        lastName: userData.lastName,
        pseudo: userData.username,
        email: userData.email,
        password: userData.password,
        phone: userData.phone,
        description: userData.description,
        categoryKeys: userData.interests,
      };

      console.log("Données envoyées à l'API:", apiData);
      const response = await registerUser(apiData);
      return response;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { register, loading, error };
}
