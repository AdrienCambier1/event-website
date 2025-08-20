"use client";
import { useAuth as useAuthContext } from "@/contexts/auth-context";
import { fetchCurrentUser } from "@/services/user-service";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export function useAuth() {
  const context = useAuthContext();
  const router = useRouter();

  const loginWithCredentials = async (email, password, redirectPath = "/") => {
    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur de connexion");
      }

      const response = await res.json();
      const token = response.token;

      const decodedToken = jwtDecode(token);

      const userProfile = await fetchCurrentUser(token);

      const user = {
        email: decodedToken.sub,
        exp: decodedToken.exp,
        iat: decodedToken.iat,
        pseudo: userProfile.pseudo,
        imageUrl: userProfile.imageUrl,
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        role: userProfile.role,
      };

      const result = await context.login({ user, token }, redirectPath);

      if (result.success) {
        window.dispatchEvent(new Event("auth-change"));
        router.push(result.redirectPath);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  };

  const registerWithCredentials = async (userData, redirectPath = "/") => {
    try {
      const res = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Erreur lors de l'inscription");
      }

      const response = await res.json();
      const token = response.token;

      const decodedToken = jwtDecode(token);

      const userProfile = await fetchCurrentUser(token);

      const user = {
        email: decodedToken.sub,
        exp: decodedToken.exp,
        iat: decodedToken.iat,
        pseudo: userProfile.pseudo,
        imageUrl: userProfile.imageUrl,
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        role: userProfile.role,
      };

      const result = await context.login({ user, token }, redirectPath);

      if (result.success) {
        window.dispatchEvent(new Event("auth-change"));
        router.push(result.redirectPath);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erreur d'inscription:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    try {
      await fetch("/api/auth/logout", {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.warn("Erreur lors du logout API:", error);
    }

    const result = context.logout();

    if (result.success) {
      window.dispatchEvent(new Event("auth-change"));
      router.push(result.redirectPath);
      return true;
    }

    return false;
  };

  return {
    ...context,
    loginWithCredentials,
    registerWithCredentials,
    logoutUser,
  };
}
