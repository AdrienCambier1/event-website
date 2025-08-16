import { useEffect, useRef, useState } from "react";
import SearchContainerBtn from "../buttons/search-container-btn";

export default function SearchList({ isSearchModalOpen }) {
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsAtTop(container.scrollTop <= 0);

    const isBottom =
      Math.ceil(container.scrollTop + container.clientHeight) >=
      container.scrollHeight;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    if (isSearchModalOpen) {
      checkScrollPosition();
    }
  }, [isSearchModalOpen, checkScrollPosition]);

  const scrollContainerProps = {
    ref: scrollContainerRef,
    onScroll: checkScrollPosition,
    className: `${isSearchModalOpen ? "opacity-100" : "opacity-0"} ${
      !isAtTop && !isAtBottom
        ? "mask-both"
        : !isAtTop
        ? "mask-top"
        : !isAtBottom
        ? "mask-bottom"
        : ""
    } mt-6 h-full w-full max-w-[30rem] flex flex-col gap-3 overflow-auto scrollbar-hide transition`,
  };

  return (
    <div {...scrollContainerProps}>
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
