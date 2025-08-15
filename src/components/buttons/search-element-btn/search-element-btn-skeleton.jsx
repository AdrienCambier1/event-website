import { City, User, NavArrowRight, MapPin } from "iconoir-react";

export default function SearchElementBtnSkeleton({ type }) {
  return (
    <div className="search-element-btn skeleton-bg">
      <div className="flex items-center gap-2">
        {type === "city" && <City />}
        {type === "place" && <MapPin />}
        {type === "organizer" && <User />}
        <p className="dark-text">Titre</p> <p>Ville</p>
      </div>
      <button className="secondary-btn">
        <span>Voir</span>
        <NavArrowRight />
      </button>
    </div>
  );
}
