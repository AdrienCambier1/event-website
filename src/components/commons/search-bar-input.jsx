"use client";
import { useSearchModal } from "@/contexts/search-modal-context";
import { Search, NavArrowRight, Check } from "iconoir-react";
import { useEffect, useRef, useState } from "react";

export default function SearchBarInput({
  inputRef,
  searchTypes,
  searchTerm,
  setSearchTerm,
  searchType,
  setSearchType,
}) {
  const [searchDropdown, setSearchDropdown] = useState(false);
  const { isSearchModalOpen } = useSearchModal();
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSearchDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleTypeChange = (value) => {
    setSearchType(value);
    setSearchDropdown(false);
  };

  const selectedSearchType = searchTypes.find(
    (type) => type.value === searchType
  );

  return (
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
        <div className="relative">
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
            ref={dropdownRef}
            className={`${
              searchDropdown ? "visible opacity-100" : "invisible opacity-0"
            } !w-fit right-0 dropdown-parent`}
          >
            {searchTypes.map((type, index) => (
              <button
                type="button"
                onClick={() => handleTypeChange(type.value)}
                key={index}
                className={`dropdown-child${
                  searchType === type.value
                    ? " !text-[var(--primary-blue)]"
                    : ""
                }`}
              >
                <span>{type.label}</span>
                {searchType === type.value && <Check />}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
