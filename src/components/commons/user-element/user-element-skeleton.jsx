export default function UserElementSkeleton() {
  return (
    <div className="flex items-center gap-4 w-full">
      <div className="profil-pic-lg skeleton-bg"></div>
      <div className="w-full flex items-center justify-between gap-2 py-3 border-b border-[var(--secondary-border-col)]">
        <div className="flex flex-col gap-2">
          <p className="skeleton-bg">Prénom et nom du participant</p>
          <p className="skeleton-bg">Pseudo du participant</p>
        </div>
      </div>
    </div>
  );
}
