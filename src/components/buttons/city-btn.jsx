import { useState, useEffect, useRef } from "react";
import { NavArrowRight } from "iconoir-react";
import Link from "next/link";
import { useCities } from "@/hooks/use-city";

export default function CityBtn({ reverse, onClick }) {
  const [cityDropdown, setCityDropdown] = useState(false);
  const cityDropdownRef = useRef(null);

  const {
    data: citiesData,
    loading: citiesLoading,
    error: citiesError,
  } = useCities(0, 3);

  const cities = citiesData?._embedded?.cityResponses || [];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        cityDropdownRef.current &&
        !cityDropdownRef.current.contains(event.target)
      ) {
        setCityDropdown(false);
      }
    };

    if (cityDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [cityDropdown]);

  const handleLinkClick = () => {
    setCityDropdown(false);
    onClick && onClick();
  };

  return (
    <div className="relative" ref={cityDropdownRef}>
      <button
        className="primary-btn"
        onClick={() => setCityDropdown(!cityDropdown)}
      >
        <span>Choisir une ville</span>
        <NavArrowRight />
      </button>
      <div
        className={`
          ${cityDropdown ? "visible opacity-100" : "invisible opacity-0"}
           !w-fit right-0
          ${reverse ? "dropdown-parent-reverse" : "dropdown-parent"}
        `}
      >
        {!citiesLoading &&
          !citiesError &&
          cities.map((city) => (
            <Link
              key={city.id}
              href={`/villes/${city.id}/evenements`}
              className="dropdown-child"
              onClick={handleLinkClick}
            >
              <span>{city.name}</span>
            </Link>
          ))}
        <Link
          href="/villes"
          className="secondary-btn ml-3"
          onClick={handleLinkClick}
        >
          <span>Afficher plus</span>
          <NavArrowRight />
        </Link>
      </div>
    </div>
  );
}
