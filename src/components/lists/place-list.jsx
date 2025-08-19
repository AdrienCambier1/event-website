"use client";
import CustomTitle from "@/components/titles/custom-title";
import { useState, useMemo } from "react";
import { Erase } from "iconoir-react";
import PlaceCard from "../cards/place-card/place-card";
import PlaceCardSkeleton from "../cards/place-card/place-card-skeleton";
import DropdownBtn from "../buttons/dropdown-btn";

export default function PlaceList({ title, description, isLoading, places }) {
  const [sortOption, setSortOption] = useState("events");
  const [searchKeyword, setSearchKeyword] = useState("");

  const sortOptions = [
    { label: "Plus d'événements", value: "events" },
    { label: "Ordre A-Z", value: "asc" },
    { label: "Ordre Z-A", value: "desc" },
  ];

  const filteredAndSortedPlaces = useMemo(() => {
    if (!places || !Array.isArray(places)) return [];

    let filteredPlaces = [...places];

    if (searchKeyword.trim()) {
      filteredPlaces = filteredPlaces.filter(
        (place) =>
          place.name?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          place.cityName?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    return filteredPlaces.sort((a, b) => {
      switch (sortOption) {
        case "events":
          return (b.eventsCount || 0) - (a.eventsCount || 0);
        case "asc":
          return a.name.localeCompare(b.name);
        case "desc":
          return b.name.localeCompare(a.name);
        default:
          return 0;
      }
    });
  }, [places, searchKeyword, sortOption]);

  return (
    <section className="page-grid">
      <div>
        <div className="flex flex-col gap-6 sticky top-20">
          <CustomTitle title={title} description={description} />
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Rechercher un lieux"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />

            <DropdownBtn
              options={sortOptions}
              selectedValue={sortOption}
              label="Trier par :"
              onSelect={(option) => setSortOption(option.value)}
            />
          </div>
        </div>
      </div>
      <div className="cards-grid">
        {isLoading && (
          <>
            <PlaceCardSkeleton />
            <PlaceCardSkeleton />
            <PlaceCardSkeleton />
            <PlaceCardSkeleton />
          </>
        )}
        {!isLoading && filteredAndSortedPlaces.length === 0 && (
          <div className="flex flex-col gap-4">
            {searchKeyword.trim() ? (
              <>
                <p>Aucune ville trouvée pour "{searchKeyword}"</p>
                <button
                  className="primary-btn"
                  onClick={() => setSearchKeyword("")}
                >
                  <span>Effacer la recherche</span>
                  <Erase />
                </button>
              </>
            ) : (
              <p>Aucune ville disponible pour le moment</p>
            )}
          </div>
        )}
        {!isLoading &&
          filteredAndSortedPlaces.map((place) => (
            <PlaceCard
              placeId={place.id}
              key={place.id}
              name={place.name}
              eventsCount={place.eventsCount || 0}
              address={place.address}
              cityName={place.cityName}
              placeType={place.type}
              imageUrl={place.imageUrl}
            />
          ))}
      </div>
    </section>
  );
}
