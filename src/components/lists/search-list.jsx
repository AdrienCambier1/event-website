import SearchContainerBtn from "../buttons/search-container-btn/search-container-btn";
import SearchContainerBtnSkeleton from "../buttons/search-container-btn/search-container-btn-skeleton";

export default function SearchList({
  isSearchModalOpen,
  results,
  isLoading,
  searchTerm,
  searchType,
}) {
  const events = results?.filter((item) => item.type === "event") || [];
  const places = results?.filter((item) => item.type === "place") || [];
  const organizers = results?.filter((item) => item.type === "organizer") || [];
  const cities = results?.filter((item) => item.type === "city") || [];

  if (searchTerm.length === 0) return null;

  return (
    <div
      className={`${
        isSearchModalOpen ? "opacity-100" : "opacity-0"
      } mt-6 w-full max-w-[30rem] flex flex-col gap-3 overflow-auto scrollbar-hide pointer-events-auto transition`}
    >
      <h2 className={`${isLoading && "skeleton-bg"} text-white`}>
        Résultat des recherches
      </h2>
      {isLoading ? (
        <>
          <SearchContainerBtnSkeleton />
          <SearchContainerBtnSkeleton />
          <SearchContainerBtnSkeleton />
        </>
      ) : (
        <>
          {(searchType === "all" || searchType === "events") &&
            events.length > 0 && (
              <SearchContainerBtn
                title="Les événements"
                description={`${events.length} résultat${
                  events.length > 1 ? "s" : ""
                }`}
                type="event"
                results={events}
              />
            )}
          {(searchType === "all" || searchType === "cities") &&
            cities.length > 0 && (
              <SearchContainerBtn
                title="Les villes"
                description={`${cities.length} résultat${
                  cities.length > 1 ? "s" : ""
                }`}
                type="city"
                results={cities}
              />
            )}
          {(searchType === "all" || searchType === "places") &&
            places.length > 0 && (
              <SearchContainerBtn
                title="Les lieux"
                description={`${places.length} résultat${
                  places.length > 1 ? "s" : ""
                }`}
                type="place"
                results={places}
              />
            )}
          {(searchType === "all" || searchType === "organizers") &&
            organizers.length > 0 && (
              <SearchContainerBtn
                title="Les organisateurs"
                description={`${organizers.length} résultat${
                  organizers.length > 1 ? "s" : ""
                }`}
                type="organizer"
                results={organizers}
              />
            )}
          {((searchType === "all" &&
            events.length === 0 &&
            places.length === 0 &&
            cities.length === 0 &&
            organizers.length === 0) ||
            (searchType === "events" && events.length === 0) ||
            (searchType === "cities" && cities.length === 0) ||
            (searchType === "places" && places.length === 0) ||
            (searchType === "organizers" && organizers.length === 0)) && (
            <p className="text-white">Aucun résultat pour "{searchTerm}"</p>
          )}
        </>
      )}
    </div>
  );
}
