"use client";
import { useAuth as useAuthContext } from "@/contexts/auth-context";
import { authenticateUser } from "@/services/auth";
import { fetchCurrentUser } from "@/services/fetch-user";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export function useAuth() {
  const context = useAuthContext();
  const router = useRouter();

  const loginWithCredentials = async (email, password, redirectPath = "/") => {
    try {
      const response = await authenticateUser({ email, password });
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
        router.push(result.redirectPath);
        return true;
      }

      return false;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw error;
    }
  };

  const logoutUser = async () => {
    const result = context.logout();

    if (result.success) {
      router.push(result.redirectPath);
      return true;
    }

    return false;
  };

  return {
    ...context,
    loginWithCredentials,
    logoutUser,
  };
}
