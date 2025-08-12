"use client";
import MainTitle from "@/components/titles/main-title";
import CityList from "@/components/lists/city-list";
import { useCities } from "@/hooks/use-cities";

export default function VillesPage() {
  const {
    data: citiesData,
    loading: citiesLoading,
    error: citiesError,
  } = useCities(0, 50);

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
        cities={citiesData?._embedded?.cityResponses || []}
        isLoading={citiesLoading}
      />
    </main>
  );
}
