"use client";
import { useAuth as useAuthContext } from "@/contexts/auth-context";
import { authenticateUser, fetchUserProfile } from "@/services/auth";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";

export function useAuth() {
  const context = useAuthContext();
  const router = useRouter();

  const loginWithCredentials = async (email, password, redirectPath = "/") => {
    try {
      // Appel à l'API backend pour l'authentification
      const response = await authenticateUser({ email, password });
      const token = response.token;

      // Décoder le token pour extraire les infos de base
      const decodedToken = jwtDecode(token);

      // Récupérer le profil utilisateur complet
      const userProfile = await fetchUserProfile(token);

      // Créer un objet utilisateur complet
      const user = {
        email: decodedToken.sub, // Le 'sub' contient l'email
        exp: decodedToken.exp,
        iat: decodedToken.iat,
        // Ajouter les informations du profil
        pseudo: userProfile.pseudo,
        imageUrl: userProfile.imageUrl,
        // Optionnel: conserver les autres données si nécessaire
        id: userProfile.id,
        firstName: userProfile.firstName,
        lastName: userProfile.lastName,
        role: userProfile.role,
      };

      // Utiliser la fonction login du context
      const result = await context.login({ user, token }, redirectPath);

      // Si la connexion réussit, naviguer avec le router
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

    // Si la déconnexion réussit, naviguer avec le router
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
