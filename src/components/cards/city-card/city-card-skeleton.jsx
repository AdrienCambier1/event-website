import { ArrowUpRightCircleSolid } from "iconoir-react";

export default function CityCardSkeleton() {
  return (
    <div className="city-card skeleton-bg">
      <div className="p-4 h-full w-full flex flex-col gap-24 z-10">
        <div className="flex justify-between items-center">
          <p>Nombre d'événements</p>
          <p className="!font-extrabold">Nom de la ville</p>
        </div>
        <div className="flex items-end gap-8">
          <p className="!text-lg flex-1 text-start">
            Découvrez les événements d'une ville
          </p>
          <ArrowUpRightCircleSolid className="group-hover:-translate-y-1 transition" />
        </div>
      </div>
    </div>
  );
}
