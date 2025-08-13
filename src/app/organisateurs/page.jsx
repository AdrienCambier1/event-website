"use client";
import ProfilList from "@/components/lists/profil-list";
import MainTitle from "@/components/titles/main-title";
import { useOrganizers } from "@/hooks/use-organizer";

export default function OrganisateursPage() {
  const {
    organizers,
    loading: organizersLoading,
    error: organizersError,
  } = useOrganizers(50);

  return (
    <main>
      <section className="container items-center">
        <MainTitle title="Les organisateurs actifs" />
        <p className="text-center">
          Découvrez les différents organisateurs d'événements qui animent notre
          plateforme.
        </p>
      </section>
      <ProfilList
        title="Découvrez tous les organisateurs d'événements"
        description="Organisateurs"
        organizers={organizers}
        isLoading={organizersLoading}
      />
    </main>
  );
}
