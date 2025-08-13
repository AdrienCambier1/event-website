"use client";
import PlaceList from "@/components/lists/place-list";
import MainTitle from "@/components/titles/main-title";
import { usePlaces } from "@/hooks/use-places";

export default function LieuxPage() {
  const {
    places,
    loading: placesLoading,
    error: placesError,
  } = usePlaces(0, 10);

  return (
    <main>
      <section className="container items-center">
        <MainTitle title={`Les lieux événementielles`} />
        <p className="text-center">
          Découvrez tous les lieux où se déroulent les événements.
        </p>
      </section>
      <PlaceList
        title="Découvrez tous les lieux"
        description="Lieux"
        places={places}
        isLoading={placesLoading}
      />
    </main>
  );
}
