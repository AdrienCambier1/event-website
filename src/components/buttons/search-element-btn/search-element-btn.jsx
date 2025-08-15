import { Check, City, NavArrowRight } from "iconoir-react";

export default function SearchElementBtn({ className, selected, onClick }) {
  return (
    <div className={`search-element-btn ${className}`} onClick={onClick}>
      <div className="flex items-center gap-2">
        <City />
        <p className="dark-text">Titre</p> <p>Ville</p>
      </div>
      <button className="secondary-btn">
        <span>Voir</span>
        <NavArrowRight
          className={`${selected ? "rotate-90" : ""} transition`}
        />
      </button>
    </div>
  );
}
