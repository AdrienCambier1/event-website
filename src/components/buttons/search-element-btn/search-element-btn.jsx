import { Calendar, City, MapPin, NavArrowRight, User } from "iconoir-react";
import Link from "next/link";

export default function SearchElementBtn({
  className,
  selected,
  onClick,
  title = "Titre",
  description = "Ville",
  action = "Voir",
  type,
  isParent,
  elementId,
}) {
  const typeRedirections = {
    event: (id) => `/evenements/${id}`,
    city: (id) => `/villes/${id}/evenements`,
    place: (id) => `/lieux/${id}/evenements`,
    organizer: (id) => `/organisateurs/${id}/evenements`,
  };

  const typeIcons = {
    city: City,
    place: MapPin,
    organizer: User,
    event: Calendar,
  };

  const redirection = typeRedirections[type]?.(elementId) || "/";
  const IconComponent = typeIcons[type] || Calendar;

  const SearchElementContent = () => (
    <>
      <div className="flex items-center gap-2 flex-1 truncate">
        <IconComponent />
        <p className="dark-text">{title}</p>
        <p className="truncate">{description}</p>
      </div>
      <button className="secondary-btn flex-shrink-0">
        <span>{action}</span>
        <NavArrowRight
          className={`${selected ? "rotate-90" : ""} transition`}
        />
      </button>
    </>
  );

  return isParent ? (
    <div className={`search-element-btn ${className}`} onClick={onClick}>
      <SearchElementContent />
    </div>
  ) : (
    <Link
      href={redirection}
      className={`search-element-btn ${className}`}
      onClick={onClick}
    >
      <SearchElementContent />
    </Link>
  );
}
