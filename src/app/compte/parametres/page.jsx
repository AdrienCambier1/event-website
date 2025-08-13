"use client";
import InformationsPage from "./informations/page";
import PreferencesPage from "./preferences/page";
import { useParametres } from "@/contexts/parametres-context";

export default function ParametresPage() {
  const { user, isLoading, accountError } = useParametres();

  return (
    <>
      <InformationsPage
        user={user}
        isLoading={isLoading}
        accountError={accountError}
      />
      <PreferencesPage
        user={user}
        isLoading={isLoading}
        accountError={accountError}
      />
    </>
  );
}
