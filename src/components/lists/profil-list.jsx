"use client";
import CustomTitle from "@/components/titles/custom-title";
import OrganiserCard from "@/components/cards/organizer-card/organizer-card";
import OrganiserCardSkeleton from "@/components/cards/organizer-card/organizer-card-skeleton";
import { useState, useEffect, useRef, useMemo } from "react";
import { Erase } from "iconoir-react";
import DropdownBtn from "../buttons/dropdown-btn";

export default function ProfilList({
  title,
  description,
  isLoading,
  organizers,
}) {
  const [sortOption, setSortOption] = useState("liked");
  const [searchTerm, setSearchTerm] = useState("");

  const sortOptions = [
    { label: "Mieux noté", value: "liked" },
    { label: "Plus d'événements", value: "events" },
    { label: "Ordre A-Z", value: "asc" },
    { label: "Ordre Z-A", value: "desc" },
  ];

  const filteredAndSortedOrganizers = useMemo(() => {
    if (!organizers || !Array.isArray(organizers)) return [];

    let filteredOrganizers = [...organizers];

    if (searchTerm.trim()) {
      filteredOrganizers = filteredOrganizers.filter(
        (organizer) =>
          organizer.pseudo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          organizer.firstName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          organizer.lastName
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          organizer.description
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    return filteredOrganizers.sort((a, b) => {
      switch (sortOption) {
        case "liked":
          return (b.note || 0) - (a.note || 0);
        case "events":
          return (b.eventsCount || 0) - (a.eventsCount || 0);
        case "asc":
          return (a.pseudo || "").localeCompare(b.pseudo || "");
        case "desc":
          return (b.pseudo || "").localeCompare(a.pseudo || "");
        default:
          return 0;
      }
    });
  }, [organizers, searchTerm, sortOption]);

  return (
    <section className="page-grid">
      <div className="flex flex-col gap-6">
        <CustomTitle title={title} description={description} />
        <div className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Mot clé"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <DropdownBtn
            options={sortOptions}
            selectedValue={sortOption}
            label="Trier par :"
            onSelect={(option) => setSortOption(option.value)}
          />
        </div>
      </div>
      <div className="cards-grid">
        {isLoading && (
          <>
            <OrganiserCardSkeleton />
            <OrganiserCardSkeleton />
            <OrganiserCardSkeleton />
            <OrganiserCardSkeleton />
          </>
        )}
        {!isLoading && filteredAndSortedOrganizers.length === 0 && (
          <div className="flex flex-col gap-4">
            {searchTerm.trim() ? (
              <>
                <p>Aucun organisateur trouvé pour "{searchTerm}"</p>
                <button
                  className="primary-btn"
                  onClick={() => setSearchTerm("")}
                >
                  <span>Effacer la recherche</span>
                  <Erase />
                </button>
              </>
            ) : (
              <p>Aucun organisateur disponible pour le moment</p>
            )}
          </div>
        )}
        {!isLoading &&
          filteredAndSortedOrganizers.map((organizer) => (
            <OrganiserCard
              organizerId={organizer.id}
              key={organizer.id}
              name={`${organizer.firstName} ${organizer.lastName}`}
              pseudo={organizer.pseudo}
              eventPastCount={organizer.eventPastCount || 0}
              eventsCount={organizer.eventsCount || 0}
              note={organizer.note?.toString() || "0"}
              imageUrl={organizer.imageUrl}
            />
          ))}
      </div>
    </section>
  );
}
