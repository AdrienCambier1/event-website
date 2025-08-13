"use client";
import MainTitle from "@/components/titles/main-title";
import CityList from "@/components/lists/city-list";
import { useCities } from "@/hooks/use-city";

export default function VillesPage() {
  const {
    cities,
    loading: citiesLoading,
    error: citiesError,
  } = useCities(0, 10);

  return (
    <main>
      <section className="container items-center">
        <MainTitle title={`Les villes événementielles`} />
        <p className="text-center">
          Découvrez les différentes villes proche de chez vous qui organisent
          des événements.
        </p>
      </section>
      <CityList
        title="Effectuez une recherche"
        description="Villes"
        showSort={true}
        cities={cities}
        isLoading={citiesLoading}
      />
    </main>
  );
}
