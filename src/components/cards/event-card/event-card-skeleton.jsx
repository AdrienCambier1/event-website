import { Bookmark } from "iconoir-react";
import RatingStar from "../../commons/rating-stars";
import ThemeTags from "../../commons/theme-tags";
import ProfilImages from "../../commons/profil-images/profil-images";
import ProfilImagesSkeleton from "../../commons/profil-images/profil-images-skeleton";

export default function EventCardSkeleton() {
  return (
    <div className="white-card skeleton-bg">
      <div className="relative">
        <div className="rounded-t-xl aspect-[16/9]"></div>
      </div>
      <div className="flex flex-col gap-4 p-4">
        <div className="flex justify-between items-center">
          <h3>Nom de l'événement</h3>
          <Bookmark className="h-6 w-6 flex-shrink-0" />
        </div>
        <div className="flex items-center gap-4">
          <div className="profil-pic-md rounded-full"></div>
          <div className="flex flex-col">
            <p>Nom de l'organisateur</p>
            <RatingStar note={4} />
          </div>
        </div>
        <p>Ville | Date et heure de l'événement</p>
        <ThemeTags theme={["Thème", "Catégorie"]} />
        <p className="line-clamp-3">Description de l'événement</p>
        <div className="flex justify-between items-center">
          <ProfilImagesSkeleton />
        </div>
      </div>
    </div>
  );
}
