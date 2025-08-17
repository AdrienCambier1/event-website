import SearchContainerBtn from "../buttons/search-container-btn";
import SearchElementBtnSkeleton from "../buttons/search-element-btn/search-element-btn-skeleton";

export default function SearchList({
  isSearchModalOpen,
  results,
  isLoading,
  searchTerm,
}) {
  const events = results?.filter((item) => item.type === "event") || [];
  const places = results?.filter((item) => item.type === "place") || [];
  const organizers = results?.filter((item) => item.type === "organizer") || [];

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
          <SearchElementBtnSkeleton />
          <SearchElementBtnSkeleton />
          <SearchElementBtnSkeleton />
        </>
      ) : (
        <>
          {events.length > 0 && (
            <SearchContainerBtn
              title="Les événements"
              description={`${events.length} résultat${
                events.length > 1 ? "s" : ""
              }`}
              results={events}
            />
          )}
          {places.length > 0 && (
            <SearchContainerBtn
              title="Les lieux"
              description={`${places.length} résultat${
                places.length > 1 ? "s" : ""
              }`}
              results={places}
            />
          )}
          {organizers.length > 0 && (
            <SearchContainerBtn
              title="Les organisateurs"
              description={`${organizers.length} résultat${
                organizers.length > 1 ? "s" : ""
              }`}
              results={organizers}
            />
          )}
          {events.length === 0 &&
            places.length === 0 &&
            organizers.length === 0 && (
              <p className="text-white">Aucun résultat pour "{searchTerm}"</p>
            )}
        </>
      )}
    </div>
  );
}
