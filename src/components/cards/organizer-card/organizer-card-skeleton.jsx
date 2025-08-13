import RatingStar from "../../commons/rating-stars";

export default function OrganizerCardSkeleton() {
  return (
    <div className="white-card p-4 flex gap-4 skeleton-bg">
      <div className="flex flex-col gap-4 w-full">
        <h3>Nom</h3>
        <div className="flex flex-col">
          <p className="blue-text">Pseudo</p>
          <RatingStar note={0} />
        </div>
        <p>0 abonnés | 0 événements</p>
        <div className="w-full flex justify-end">
          <button className="secondary-btn">
            <span>Voir le profil</span>
          </button>
        </div>
      </div>
    </div>
  );
}
