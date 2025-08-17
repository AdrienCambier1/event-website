import SearchElementBtnSkeleton from "../search-element-btn/search-element-btn-skeleton";

export default function SearchContainerBtnSkeleton() {
  return (
    <div className="relative">
      <SearchElementBtnSkeleton />
      <SearchElementBtnSkeleton className="absolute bottom-0 -z-10 scale-x-95 w-full pointer-events-none" />
      <div className="pt-[0.5rem] w-full -z-10 flex flex-col gap-3"></div>
    </div>
  );
}
