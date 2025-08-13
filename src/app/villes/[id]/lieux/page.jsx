"use client";
import PlaceList from "@/components/lists/place-list";
import { useParams } from "next/navigation";
import { useCityPlaces } from "@/hooks/use-places";

export default function LieuxPage() {
  const { id } = useParams();

  const {
    places,
    loading: placesLoading,
    error: placesError,
  } = useCityPlaces(id, 50);

  return (
    <PlaceList
      title="Les lieux de la ville"
      description="Lieux"
      places={places}
      isLoading={placesLoading}
      error={placesError}
    />
  );
}
