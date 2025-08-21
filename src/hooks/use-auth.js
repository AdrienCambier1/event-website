"use client";
import { useState } from "react";
import { useAuth as useAuthContext } from "@/contexts/auth-context";
import { fetchCurrentUser } from "@/services/user-service";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export function useAuth() {
  const [isAuthenticating, setIsAuthenticating] = useState(false);
  const context = useAuthContext();
  const router = useRouter();

  const isAuthenticated = !!context.user;

  const authenticate = async (endpoint, data) => {
    const res = await fetch(`/api/auth/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
      credentials: "include",
    });

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error || `Erreur ${endpoint}`);
    }

    const { token } = await res.json();
    const decodedToken = jwtDecode(token);
    const userProfile = await fetchCurrentUser(token);

    return { user: { ...decodedToken, ...userProfile }, token };
  };

  const loginWithCredentials = async (email, password, redirectPath = "/") => {
    try {
      setIsAuthenticating(true);
      const authData = await authenticate("login", { email, password });
      const result = context.login(authData, redirectPath);

      window.location.href = result.redirectPath;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const registerWithCredentials = async (userData, redirectPath = "/") => {
    try {
      setIsAuthenticating(true);
      const authData = await authenticate("register", userData);
      const result = context.login(authData, redirectPath);

      window.location.href = result.redirectPath;
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    } finally {
      setIsAuthenticating(false);
    }
  };

  const logoutUser = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.warn("Erreur logout API:", error);
    }
    context.logout();

    window.location.href = "/";
  };

  return {
    ...context,
    isAuthenticated,
    isAuthenticating,
    loginWithCredentials,
    registerWithCredentials,
    logoutUser,
  };
}
