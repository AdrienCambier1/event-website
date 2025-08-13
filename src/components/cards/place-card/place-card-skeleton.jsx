export default function PlaceCardSkeleton() {
  return (
    <div className="white-card p-4 flex gap-4 skeleton-bg">
      <div className="flex flex-col gap-4 w-full">
        <h3>Nom</h3>
        <p className="blue-text">Ville et adresse</p>
        <div className="green-tag">
          <span>Type du lieux</span>
        </div>
        <p className="line-clamp-2">Description du lieux</p>
        <div className="w-full flex justify-end">
          <button className="secondary-btn">
            <span>Voir le profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
