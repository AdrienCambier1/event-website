"use client";
import { createContext, useContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { fetchCurrentUser } from "@/services/user-service";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

const setSecureCookie = (name, value, maxAge) => {
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(
    value
  )}; path=/; max-age=${maxAge}; SameSite=Lax${secure}`;
};

export function AuthProvider({ children }) {
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
            logout();
          } else {
            try {
              const userProfile = await fetchCurrentUser(storedToken);
              setUser({ ...decodedToken, ...userProfile });
            } catch {
              setUser(decodedToken);
            }
            setToken(storedToken);
            setSecureCookie(
              "auth_token",
              storedToken,
              decodedToken.exp - currentTime
            );
          }
        }
      } catch (error) {
        console.error("Erreur lors de la vérification du token:", error);
        logout();
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = ({ user, token }, redirectPath = "/") => {
    localStorage.setItem("token", token);
    setToken(token);
    setUser(user);
    setSecureCookie(
      "auth_token",
      token,
      user.exp - Math.floor(Date.now() / 1000)
    );
    return { success: true, redirectPath };
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    setSecureCookie("auth_token", "", 0);
  };

  const value = {
    user,
    token,
    loading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
