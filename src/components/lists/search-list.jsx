import SearchContainerBtn from "../buttons/search-container-btn";

export default function SearchList({ isSearchModalOpen }) {
  return (
    <div
      className={`${
        isSearchModalOpen ? "opacity-100" : "opacity-0"
      } mt-6 w-full max-w-[30rem] flex flex-col gap-3 overflow-auto scrollbar-hide pointer-events-auto transition`}
    >
      <h2 className="text-white">Résultat des recherches</h2>
      <SearchContainerBtn title="Les événements" description="3 en cours" />
      <SearchContainerBtn
        title="Les villes événementielles"
        description="4 villes"
      />
      <SearchContainerBtn title="Les lieux" description="5 lieux" />
    </div>
  );
}
