"use client";
import { useState, useRef, useEffect } from "react";
import { Check, NavArrowRight, Search } from "iconoir-react";
import ModalBg from "./modal-bg";
import ReactFocusLock from "react-focus-lock";
import { useSearchModal } from "@/contexts/search-modal-context";
import SearchContainerBtn from "../buttons/search-container-btn";

export default function SearchBarModal() {
  const { isSearchModalOpen, closeSearchModal } = useSearchModal();
  const [mounted, setMounted] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const [searchDropdown, setSearchDropdown] = useState(false);
  const searchDropdownRef = useRef(null);
  const scrollContainerRef = useRef(null);
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const searchTypes = [
    { label: "Tous", value: "all" },
    { label: "Evenements", value: "events" },
    { label: "Villes", value: "cities" },
    { label: "Lieux", value: "places" },
    { label: "Organisateurs", value: "organisers" },
  ];

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
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeSearchModal();
      }
    };

    if (isSearchModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchModalOpen]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(event.target)
      ) {
        setSearchDropdown(false);
      }
    };

    if (searchDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [searchDropdown]);

  const handleTypeChange = (type) => {
    setSearchType(type);
    setSearchDropdown(false);
  };

  const selectedSearchType = searchTypes.find(
    (type) => type.value === searchType
  );

  useEffect(() => {
    if (isSearchModalOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    setMounted(true);

    if (isSearchModalOpen) {
      checkScrollPosition();
    }
  }, [isSearchModalOpen, checkScrollPosition]);

  if (!mounted) return null;

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
    } mt-6 w-full max-w-[30rem] flex flex-col gap-3 overflow-auto scrollbar-hide transition `,
  };

  return (
    <>
      <ReactFocusLock
        ref={modalRef}
        className={`${
          isSearchModalOpen ? "visible" : "invisible"
        } modal-container flex-col !justify-start`}
      >
        <div
          className={`${
            isSearchModalOpen ? "opacity-100" : "opacity-0"
          } search-bar-btn pointer-events-auto`}
        >
          <Search />
          <input
            ref={inputRef}
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={
              searchType === "events"
                ? "Rechercher un événement"
                : searchType === "cities"
                ? "Rechercher une ville"
                : searchType === "places"
                ? "Rechercher un lieu"
                : searchType === "organisers"
                ? "Rechercher un organisateur"
                : "Rechercher un élément"
            }
            className="invisible-input truncate"
            autoComplete="off"
          />
          <div className="flex items-center gap-3">
            <p className="hidden md:block border border-[var(--secondary-border-col)] px-2 rounded-md">
              Esc
            </p>
            <div className="relative" ref={searchDropdownRef}>
              <button
                className="secondary-btn"
                type="button"
                onClick={() => setSearchDropdown(!searchDropdown)}
              >
                <span>
                  <span>{selectedSearchType?.label || ""}</span>
                </span>
                <NavArrowRight />
              </button>
              <div
                className={`${
                  searchDropdown ? "visible opacity-100" : "invisible opacity-0"
                } !w-fit right-0 dropdown-parent`}
              >
                {searchTypes.map((type, index) => (
                  <button
                    type="button"
                    onClick={() => handleTypeChange(type.value)}
                    key={index}
                    className={`${
                      searchType === type.value && "!text-[var(--primary-blue)]"
                    } dropdown-child`}
                  >
                    <span>{type.label}</span>
                    {searchType === type.value && <Check />}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div {...scrollContainerProps}>
          <h2 className="text-white">Résultat des recherches</h2>
          <SearchContainerBtn />
          <SearchContainerBtn />
          <SearchContainerBtn />
        </div>
      </ReactFocusLock>
      <ModalBg isOpen={isSearchModalOpen} setIsOpen={closeSearchModal} />
    </>
  );
}
