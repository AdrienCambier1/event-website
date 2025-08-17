import { User, NavArrowRight } from "iconoir-react";

export default function SearchElementBtnSkeleton({ className }) {
  return (
    <div className={`search-element-btn skeleton-bg ${className}`}>
      <div className="flex items-center gap-2">
        <User />
        <p className="dark-text">Titre</p> <p>Information</p>
      </div>
      <button className="secondary-btn flex-shrink-0">
        <span>Voir</span>
        <NavArrowRight />
      </button>
    </div>
  );
}
