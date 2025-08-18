import { User } from "iconoir-react";

export default function InformationsCardSkeleton() {
  return (
    <div className="informations-card skeleton-bg">
      <div className="flex justify-between gap-4">
        <div className="flex flex-col gap-4 min-w-0">
          <h4>Information</h4>
          <p className="break-words line-clamp-2">
            Description de l'information
          </p>
        </div>
      </div>
      <div className="w-full flex justify-end">
        <div className="secondary-btn">
          <span>Bouton pour modifier</span>
        </div>
      </div>
    </div>
  );
}
