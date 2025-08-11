import { Check } from "iconoir-react";

export default function ThemeCardSkeleton() {
  return (
    <div className="theme-card group skeleton-bg">
      <div className="flex flex-col items-center justify-center gap-2">
        <Check />
        <p className="group-hover:text-white transition">Catégorie</p>
      </div>
    </div>
  );
}
