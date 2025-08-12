"use client";
import { useState, useEffect, Suspense } from "react";
import MainTitle from "@/components/titles/main-title";
import Link from "next/link";
import OrSplitter from "@/components/or-splitter";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faApple,
  faFacebookF,
  faGoogle,
} from "@fortawesome/free-brands-svg-icons";
import { ArrowLeft } from "iconoir-react";
import StepIndicator from "@/components/step-indicator";
import ThemeButton from "@/components/buttons/theme-btn";
import { useRouter, useSearchParams } from "next/navigation";
import { Eye, EyeClosed } from "iconoir-react";
import { useRegister } from "@/hooks/use-register";
import { useAuth } from "@/hooks/use-auth";
import { useCategories } from "@/hooks/use-categories";

function InscriptionPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const {
    register,
    loading: registerLoading,
    error: registerError,
  } = useRegister();
  const { loginWithCredentials } = useAuth();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    email: "",
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    description: "",
    phone: "",
    interests: [],
  });

  const [passwordStrength, setPasswordStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const isPasswordValid =
    Object.values(passwordStrength).filter(Boolean).length >= 4;

  const isStepValid = () => {
    switch (step) {
      case 1:
        return (
          formData.email !== "" &&
          formData.username !== "" &&
          formData.password !== "" &&
          validateEmail(formData.email) &&
          isPasswordValid
        );
      case 2:
        return (
          formData.firstName !== "" &&
          formData.lastName !== "" &&
          formData.phone !== ""
        );
      case 3:
        return formData.interests.length > 0;
      default:
        return false;
    }
  };

  const steps = [
    {
      value: 1,
      onClick: () => setStep(1),
      disabled: false,
    },
    {
      value: 2,
      onClick: () => setStep(2),
      disabled: step === 1 && !isStepValid(),
    },
    {
      value: 3,
      onClick: () => setStep(3),
      disabled: step < 2 || (step === 2 && !isStepValid()),
    },
  ];

  useEffect(() => {
    const { password } = formData;
    setPasswordStrength({
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [formData.password]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleNextStep = () => {
    if (isStepValid()) {
      setStep(step + 1);
    }
  };

  const handlePreviousStep = () => {
    setStep(step - 1);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!isStepValid()) return;

    if (step < 3) {
      handleNextStep();
    } else {
      // Étape 3 : inscription finale
      try {
        const response = await register(formData);

        // Connexion automatique après inscription
        const redirectPath = searchParams.get("redirect") || "/";
        await loginWithCredentials(
          formData.email,
          formData.password,
          redirectPath
        );
      } catch (error) {
        console.error("Erreur lors de l'inscription:", error);
        // L'erreur est déjà gérée par le hook useRegister
      }
    }
  };

  const handleThemeToggle = (themeValue) => {
    setFormData((prev) => {
      if (prev.interests.includes(themeValue)) {
        return {
          ...prev,
          interests: prev.interests.filter((item) => item !== themeValue),
        };
      } else {
        return {
          ...prev,
          interests: [...prev.interests, themeValue],
        };
      }
    });
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <>
            <div className="flex flex-col gap-2">
              <label>Email*</label>
              <input
                type="text"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="gerard@example.com"
              />
              {formData.email && !validateEmail(formData.email) && (
                <p className="text-[var(--primary-red)]">
                  Veuillez entrer une adresse email valide
                </p>
              )}
            </div>
            <div className="flex flex-col gap-2">
              <label>Pseudo*</label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="gerard_du_06"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Mot de passe*</label>
              <div className="relative">
                <input
                  type={`${showPassword ? "text" : "password"}`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="****"
                />
                <div className="input-icon">
                  {showPassword ? (
                    <Eye onClick={() => setShowPassword(!showPassword)} />
                  ) : (
                    <EyeClosed onClick={() => setShowPassword(!showPassword)} />
                  )}
                </div>
              </div>
              {formData.password && (
                <p
                  className={
                    isPasswordValid
                      ? "text-[var(--primary-green)]"
                      : "text-[var(--primary-red)]"
                  }
                >
                  {isPasswordValid
                    ? "Mot de passe valide"
                    : "Votre mot de passe doit contenir au moins 8 caractères, une majuscule, un chiffre et un caractère spécial."}
                </p>
              )}
            </div>
          </>
        );
      case 2:
        return (
          <>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2 w-full">
                <label>Nom*</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Dupont"
                />
              </div>
              <div className="flex flex-col gap-2 w-full">
                <label>Prénom*</label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Gérard"
                />
              </div>
            </div>{" "}
            <div className="flex flex-col gap-2">
              <label>Numéro de téléphone*</label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="06 12 34 56 78"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label>Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Quelques mots pour vous décrire"
              />
            </div>
          </>
        );
      case 3:
        // Utiliser les catégories dynamiques, avec fallback si elles ne sont pas encore chargées
        const availableThemes = categoriesLoading
          ? [
              { label: "Musique", value: "music" },
              { label: "Sport", value: "sport" },
              { label: "Études", value: "learning" },
              { label: "Culture", value: "culture" },
              { label: "Technologie", value: "technology" },
            ]
          : categories.map((category) => ({
              label: category.name,
              value: category.key.toLowerCase(),
            }));

        return (
          <>
            {availableThemes.map((theme) => (
              <ThemeButton
                key={theme.value}
                theme={theme.label}
                isSelected={formData.interests.includes(theme.value)}
                onClick={() => handleThemeToggle(theme.value)}
              />
            ))}
            <p className="text-center">
              Une fois validé, vous pourrrez modifier vos préférences dans votre
              profil
            </p>
          </>
        );
      default:
        return null;
    }
  };

  return (
    <main>
      <section className="container items-center">
        <MainTitle title="S'inscrire" />
        <StepIndicator currentStep={step} steps={steps} />
      </section>
      <section className="container items-center">
        <form onSubmit={handleFormSubmit}>
          {renderStep()}

          {step === 1 ? (
            <div className="flex flex-col gap-2">
              <button
                type="submit"
                disabled={!isStepValid()}
                className="primary-form-btn"
              >
                <span>Continuer</span>
              </button>
              <p className="text-center w-fit">
                Déjà un compte ?{" "}
                <Link
                  href={`/connexion${
                    searchParams.get("redirect")
                      ? `?redirect=${searchParams.get("redirect")}`
                      : ""
                  }`}
                  className="blue-text underline"
                >
                  Se connecter
                </Link>
              </p>
            </div>
          ) : (
            <>
              <button
                type="submit"
                disabled={!isStepValid() || registerLoading}
                className="primary-form-btn"
              >
                <span>
                  {registerLoading
                    ? "Inscription en cours..."
                    : step < 3
                    ? "Continuer"
                    : "S'inscrire"}
                </span>
              </button>
              {registerError && (
                <p className="red-text text-center">{registerError}</p>
              )}
            </>
          )}

          {step > 1 && (
            <div className="w-full flex justify-center">
              <button
                type="button"
                onClick={handlePreviousStep}
                className="back-form-btn"
              >
                <ArrowLeft />
              </button>
            </div>
          )}

          {step === 1 && (
            <>
              <OrSplitter />
              <div className="flex items-center justify-center gap-6">
                <button type="button" className="rounded-form-btn">
                  <FontAwesomeIcon icon={faGoogle} />
                </button>
                <button type="button" className="rounded-form-btn">
                  <FontAwesomeIcon icon={faFacebookF} />
                </button>
                <button type="button" className="rounded-form-btn">
                  <FontAwesomeIcon icon={faApple} />
                </button>
              </div>
            </>
          )}
        </form>
      </section>
    </main>
  );
}

export default function InscriptionPage() {
  return (
    <Suspense fallback={<></>}>
      <InscriptionPageContent />
    </Suspense>
  );
}
