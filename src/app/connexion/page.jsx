"use client";
import MainTitle from "@/components/titles/main-title";
import Link from "next/link";
import OrSplitter from "@/components/commons/or-splitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import PasswordInput from "@/components/inputs/password-input";

function ConnexionPageContent() {
  const { loginWithCredentials, isAuthenticating } = useAuth();
  const searchParams = useSearchParams();
  const [error, setError] = useState("");

  const redirectUrl = searchParams.get("redirect") || "/";
  const redirectUri = `${
    process.env.NEXT_PUBLIC_FRONTEND_URL
  }/auth/callback?redirect=${encodeURIComponent(redirectUrl)}`;
  const backendGoogleLoginUrl = `${
    process.env.NEXT_PUBLIC_BACK_URL
  }/oauth2/authorize/google?redirect_uri=${encodeURIComponent(redirectUri)}`;

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.email && formData.password) {
      try {
        const redirectPath = searchParams.get("redirect") || "/";
        await loginWithCredentials(
          formData.email,
          formData.password,
          redirectPath
        );
        // La redirection se fait automatiquement dans le hook
      } catch (err) {
        setError(err.message || "Erreur de connexion");
      }
    }
  };

  const isFormValid = () => {
    return formData.email !== "" && formData.password !== "";
  };

  return (
    <main>
      <section className="container items-center">
        <MainTitle title="Se connecter" />
        <p className="text-center">
          Bonjour! Veuillez entrez vos informations afin de vous identifier
        </p>
      </section>
      <section className="container items-center">
        <form onSubmit={handleFormSubmit}>
          <div className="flex flex-col gap-2">
            <label>Email</label>
            <input
              type="text"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="gerard@example.com"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label>Mot de passe</label>
            <PasswordInput
              name="password"
              placeholder="****"
              value={formData.password}
              handleChange={handleChange}
              error={error}
            />
            {error && (
              <p className="red-text">
                Mot de passe ou email incorrect. Essayez à nouveau.
              </p>
            )}
            <button className="blue-text w-fit">Mot de passe oublié ?</button>
          </div>
          <div className="flex flex-col gap-2">
            <button
              type="submit"
              disabled={!isFormValid() || isAuthenticating}
              className="primary-form-btn"
            >
              <span>{isAuthenticating ? "Connexion..." : "Se connecter"}</span>
            </button>
            <p>
              Pas encore de compte ?{" "}
              <Link
                href={`/inscription${
                  searchParams.get("redirect")
                    ? `?redirect=${searchParams.get("redirect")}`
                    : ""
                }`}
                className="blue-text underline"
              >
                S'inscrire
              </Link>
            </p>
          </div>
          <OrSplitter />
          <div className="flex items-center justify-center gap-6">
            <Link href={backendGoogleLoginUrl} className="rounded-form-btn">
              <FontAwesomeIcon icon={faGoogle} />
            </Link>
            <button className="rounded-form-btn">
              <FontAwesomeIcon icon={faFacebookF} />
            </button>
            <button className="rounded-form-btn">
              <FontAwesomeIcon icon={faApple} />
            </button>
          </div>
        </form>
      </section>
    </main>
  );
}

export default function ConnexionPage() {
  return (
    <Suspense fallback={<></>}>
      <ConnexionPageContent />
    </Suspense>
  );
}
