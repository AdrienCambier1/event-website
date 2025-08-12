"use client";
import MainTitle from "@/components/titles/main-title";
import CustomTitle from "@/components/titles/custom-title";
import DropdownButton from "@/components/buttons/dropdown-button";
import CityCard from "@/components/cards/city-card";
import { useState, useMemo } from "react";
import { useCity } from "@/contexts/city-context";
import { useAuth } from "@/hooks/use-auth";
import { useCities } from "@/hooks/use-cities";
import CityCardSkeleton from "@/components/cards/city-card-skeleton";
import { Erase } from "iconoir-react";

export default function CitiesPage() {
  const [sortOption, setSortOption] = useState("events");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { cities, changeCity } = useCity();
  const { token } = useAuth();

  const {
    data: citiesData,
    loading: citiesLoading,
    error: citiesError,
  } = useCities(0, 10);

  const sortOptions = [
    { label: "Plus d'événements", value: "events" },
    { label: "Ordre A-Z", value: "asc" },
    { label: "Ordre Z-A", value: "desc" },
  ];

  const filteredCities = useMemo(() => {
    if (!citiesData?._embedded?.cityResponses) return [];

    let filteredCities = citiesData._embedded.cityResponses;

    if (searchKeyword.trim()) {
      filteredCities = filteredCities.filter(
        (city) =>
          city.name.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          city.region?.toLowerCase().includes(searchKeyword.toLowerCase()) ||
          city.country?.toLowerCase().includes(searchKeyword.toLowerCase())
      );
    }

    return [...filteredCities].sort((a, b) => {
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
  }, [citiesData, searchKeyword, sortOption]);

  return (
    <main>
      <section className="container items-center">
        <MainTitle title="Les villes événementielles" />
        <p className="text-center">
          Découvrez les différentes villes proche de chez vous qui organisent
          des événements.
        </p>
      </section>
      <section className="page-grid">
        <div className="flex flex-col gap-6">
          <CustomTitle
            title="Effectuez une recherche"
            description="Organisateurs"
          />
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Rechercher une ville..."
              value={searchKeyword}
              onChange={(e) => setSearchKeyword(e.target.value)}
            />
            <DropdownButton
              options={sortOptions}
              selectedValue={sortOption}
              label="Trier par :"
              onSelect={(option) => setSortOption(option.value)}
            />
          </div>
        </div>
        <div className="cards-grid">
          {citiesLoading && (
            <>
              <CityCardSkeleton />
              <CityCardSkeleton />
              <CityCardSkeleton />
            </>
          )}
          {!citiesLoading && filteredCities.length === 0 && (
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
          {!citiesLoading &&
            filteredCities.map((city) => (
              <CityCard
                key={city.id}
                name={city.name}
                eventsCount={city.eventsCount || 0}
                bannerUrl={city.bannerUrl}
                /* changeCity={() => changeCity(city.name)} */
              />
            ))}
        </div>
      </section>
    </main>
  );
}
