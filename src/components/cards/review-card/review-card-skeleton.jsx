import RatingStar from "@/components/commons/rating-stars";

export default function ReviewCardSkeleton() {
  return (
    <div className="white-card p-4 flex gap-4 h-fit skeleton-bg">
      <div className="profil-pic-xl" />
      <div className="flex flex-col gap-4 w-full">
        <h3 className="text-[var(--secondary-blue)]">Nom et prénom</h3>
        <div className="flex flex-col">
          <p className="dark-text">Note attribuée</p>
          <RatingStar note={0} />
        </div>
        <p className="blue-text">Une date</p>
        <p>Description de l'avis</p>
        <div className="green-tag">
          <span>Avis certifié</span>
        </div>
      </div>
    </div>
  );
}
