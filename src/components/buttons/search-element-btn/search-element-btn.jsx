import { City, NavArrowRight } from "iconoir-react";
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
  let redirection = "/";
  if (type === "event") {
    redirection = `/evenements/${elementId}`;
  } else if (type === "city") {
    redirection = `/villes/${elementId}/evenements`;
  } else if (type === "place") {
    redirection = `/lieux/${elementId}/evenements`;
  } else if (type === "organizer") {
    redirection = `/organisateurs/${elementId}/evenements`;
  }

  const SearchElementContent = () => (
    <>
      <div className="flex items-center gap-2 flex-1 truncate">
        <City />
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
