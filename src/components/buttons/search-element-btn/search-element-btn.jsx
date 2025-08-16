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
}) {
  const SearchElementContent = () => (
    <>
      <div className="flex items-center gap-2">
        <City />
        <p className="dark-text">{title}</p> <p>{description}</p>
      </div>
      <button className="secondary-btn">
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
      href="/"
      className={`search-element-btn ${className}`}
      onClick={onClick}
    >
      <SearchElementContent />
    </Link>
  );
}
