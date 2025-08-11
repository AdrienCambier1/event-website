"use client";
import CustomTitle from "@/components/titles/custom-title";
import EventCard from "@/components/cards/event-card";
import DropdownButton from "@/components/buttons/dropdown-button";
import MultiDropdownButton from "@/components/buttons/multi-dropdown-button";
import EventCardSkeleton from "../cards/event-card-skeleton";
import { useState, useEffect, Suspense, useMemo } from "react";
import { Erase, Plus } from "iconoir-react";
import Link from "next/link";
import { useCategories } from "@/hooks/use-categories";
import { useUrlFilters } from "@/hooks/use-url-filters";

function EventListContent({
  title,
  description,
  showSort,
  showFilters,
  showCreateButton,
  canEdit,
  isRegistered,
  isLoading,
  events,
}) {
  const [sortOption, setSortOption] = useState("recent");

  const { filterOptions, isLoading: categoriesLoading } = useCategories();

  const {
    selectedFilters,
    searchTerm,
    isInitialized,
    initializeFromURL,
    addFilter,
    removeFilter,
    updateSearch,
    clearAll,
  } = useUrlFilters();

  useEffect(() => {
    if (!isInitialized && filterOptions.length > 0) {
      initializeFromURL(filterOptions);
    }
  }, [isInitialized, filterOptions, initializeFromURL]);

  const sortOptions = [
    { label: "Plus récent", value: "recent" },
    { label: "Plus ancien", value: "ancien" },
    { label: "Plus populaire", value: "populaire" },
  ];

  const filteredAndSortedEvents = useMemo(() => {
    if (!events || !Array.isArray(events)) return [];

    let filteredEvents = [...events];

    if (searchTerm.trim()) {
      filteredEvents = filteredEvents.filter(
        (event) =>
          event.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.cityName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          event.organizer?.pseudo
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    if (selectedFilters.length > 0) {
      filteredEvents = filteredEvents.filter((event) =>
        event.categories?.some((category) =>
          selectedFilters.includes(category.key?.toLowerCase())
        )
      );
    }

    return filteredEvents.sort((a, b) => {
      switch (sortOption) {
        case "recent":
          return new Date(b.date || 0) - new Date(a.date || 0);
        case "ancien":
          return new Date(a.date || 0) - new Date(b.date || 0);
        case "populaire":
          return (b.organizer?.note || 0) - (a.organizer?.note || 0);
        default:
          return 0;
      }
    });
  }, [events, searchTerm, selectedFilters, sortOption]);

  return (
    <section className="page-grid">
      <div className="flex flex-col gap-6">
        <CustomTitle title={title} description={description} />
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Mot clé"
            value={searchTerm}
            onChange={(e) => updateSearch(e.target.value)}
          />
          {showFilters && (
            <MultiDropdownButton
              options={filterOptions}
              selectedValues={selectedFilters}
              label="Filtre par catégorie :"
              onSelect={(option) => addFilter(option.value)}
              onRemove={removeFilter}
            />
          )}
          {showSort && (
            <DropdownButton
              options={sortOptions}
              selectedValue={sortOption}
              label="Trier par :"
              onSelect={(option) => setSortOption(option.value)}
            />
          )}
          {showCreateButton && (
            <Link href="/events/create" className="primary-btn">
              <span>Créer un événement</span>
              <Plus />
            </Link>
          )}
        </div>
      </div>
      <div className="cards-grid">
        {isLoading && (
          <>
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
            <EventCardSkeleton />
          </>
        )}
        {!isLoading && filteredAndSortedEvents.length === 0 && (
          <div className="flex flex-col gap-4">
            {searchTerm.trim() || selectedFilters.length > 0 ? (
              <>
                <p>
                  Aucun événement trouvé pour{" "}
                  {searchTerm.trim() && `"${searchTerm}"`}
                  {searchTerm.trim() && selectedFilters.length > 0 && " avec "}
                  {selectedFilters.length > 0 &&
                    `les catégories: ${selectedFilters.join(", ")}`}
                </p>
                <button className="primary-btn" onClick={clearAll}>
                  <span>Effacer les filtres</span>
                  <Erase />
                </button>
              </>
            ) : (
              <p>Aucun événement disponible pour le moment</p>
            )}
          </div>
        )}
        {!isLoading &&
          filteredAndSortedEvents.map((event) => (
            <EventCard
              key={event.id}
              date={event.date}
              description={event.description}
              name={event.name}
              organizerName={event.organizer?.pseudo}
              organizerImageUrl={event.organizer?.imageUrl}
              organizerNote={event.organizer?.note}
              imageUrl={event.imageUrl}
              cityName={event.cityName}
              isTrending={event.isTrending}
              categories={event.categories}
              canEdit={canEdit}
              isRegistered={isRegistered}
            />
          ))}
      </div>
    </section>
  );
}

export default function EventList(props) {
  return (
    <Suspense fallback={<></>}>
      <EventListContent {...props} />
    </Suspense>
  );
}
