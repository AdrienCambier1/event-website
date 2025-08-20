"use client";
import { useState, useEffect } from "react";

export function usePasswordValidation(password = "") {
  const [strength, setStrength] = useState({
    length: false,
    hasUpperCase: false,
    hasLowerCase: false,
    hasNumber: false,
    hasSpecial: false,
  });

  useEffect(() => {
    setStrength({
      length: password.length >= 8,
      hasUpperCase: /[A-Z]/.test(password),
      hasLowerCase: /[a-z]/.test(password),
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  }, [password]);

  // TOUS les critères doivent être respectés (pas seulement 4 sur 5)
  const isValid = strength.length && strength.hasUpperCase && strength.hasLowerCase && strength.hasNumber && strength.hasSpecial;
  const score = Object.values(strength).filter(Boolean).length;

  return { strength, isValid, score };
}
