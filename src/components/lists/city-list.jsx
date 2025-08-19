"use client";
import CustomTitle from "@/components/titles/custom-title";
import CityCard from "@/components/cards/city-card/city-card";
import CityCardSkeleton from "../cards/city-card/city-card-skeleton";
import { useState, useMemo } from "react";
import { Erase } from "iconoir-react";
import DropdownBtn from "../buttons/dropdown-btn";

export default function CityList({
  title,
  description,
  showSort,
  isLoading,
  cities,
}) {
  const [sortOption, setSortOption] = useState("events");
  const [searchKeyword, setSearchKeyword] = useState("");

  const sortOptions = [
    { label: "Plus d'événements", value: "events" },
    { label: "Ordre A-Z", value: "asc" },
    { label: "Ordre Z-A", value: "desc" },
  ];

  const filteredAndSortedCities = useMemo(() => {
    if (!cities || !Array.isArray(cities)) return [];

    let filteredCities = [...cities];

    if (searchKeyword.trim()) {
      filteredCities = filteredCities.filter(
        (city) =>
          city.name?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          city.region?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          city.country?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    return filteredCities.sort((a, b) => {
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
  }, [cities, searchKeyword, sortOption]);

  return (
    <section className="page-grid">
      <div>
        <div className="flex flex-col gap-6 sticky top-20">
          <CustomTitle title={title} description={description} />
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Rechercher une ville"
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            {showSort && (
              <DropdownBtn
                options={sortOptions}
                selectedValue={sortOption}
                label="Trier par :"
                onSelect={(option) => setSortOption(option.value)}
              />
            )}
          </div>
        </div>
      </div>
      <div className="cards-grid">
        {isLoading && (
          <>
            <CityCardSkeleton />
            <CityCardSkeleton />
            <CityCardSkeleton />
            <CityCardSkeleton />
          </>
        )}
        {!isLoading && filteredAndSortedCities.length === 0 && (
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
          filteredAndSortedCities.map((city) => (
            <CityCard
              cityId={city.id}
              key={city.id}
              name={city.name}
              eventsCount={city.eventsCount || 0}
              bannerUrl={city.bannerUrl}
            />
          ))}
      </div>
    </section>
  );
}
