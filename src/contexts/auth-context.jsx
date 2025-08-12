"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchCurrentUser } from "@/services/fetch-user";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const setSecureCookie = (name, value, maxAge) => {
  const encodedValue = encodeURIComponent(value);

  let cookieStr = `${name}=${encodedValue}; path=/; max-age=${maxAge}; SameSite=Lax`;

  if (typeof window !== "undefined" && window.location.protocol === "https:") {
    cookieStr += "; Secure";
  }

  document.cookie = cookieStr;
};

export function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedToken = localStorage.getItem("token");

        if (storedToken) {
          const decodedToken = jwtDecode(storedToken);

          const currentTime = Date.now() / 1000;
          if (decodedToken.exp < currentTime) {
            handleLogout();
          } else {
            try {
              // Récupérer le profil utilisateur avec le token
              const userProfile = await fetchCurrentUser(storedToken);

              // Créer l'objet utilisateur complet
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

              setToken(storedToken);
              setUser(user);
              setIsAuthenticated(true);
              setSecureCookie(
                "auth_token",
                storedToken,
                decodedToken.exp - currentTime
              );
            } catch (profileError) {
              console.error(
                "Erreur lors de la récupération du profil:",
                profileError
              );
              // Si on ne peut pas récupérer le profil, on utilise juste les données du token
              setToken(storedToken);
              setUser(decodedToken);
              setIsAuthenticated(true);
              setSecureCookie(
                "auth_token",
                storedToken,
                decodedToken.exp - currentTime
              );
            }
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        handleLogout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (authData, redirectPath = "/") => {
    try {
      const { user, token } = authData;

      // Stocker le token
      localStorage.setItem("token", token);
      setToken(token);
      setUser(user);
      setIsAuthenticated(true);

      // Créer le cookie sécurisé
      const expirationTime = user.exp - Math.floor(Date.now() / 1000);
      setSecureCookie("auth_token", token, expirationTime);

      // Retourner le chemin de redirection pour que le composant gère la navigation
      return { success: true, redirectPath };
    } catch (error) {
      console.error("Erreur d'authentification:", error);
      return { success: false, error };
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");

    const baseCookieStr =
      "auth_token=; path=/; max-age=0; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
    document.cookie = baseCookieStr;

    if (
      typeof window !== "undefined" &&
      window.location.protocol === "https:"
    ) {
      document.cookie = baseCookieStr + "; Secure";
    }
  };

  const logout = () => {
    handleLogout();
    // Retourner un indicateur pour que le composant gère la navigation
    return { success: true, redirectPath: "/" };
  };

  const value = {
    isAuthenticated,
    user,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
