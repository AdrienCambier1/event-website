import { Basketball, User } from "iconoir-react";

export default function ThemeBtnSkeleton() {
  return (
    <div className="theme-btn group skeleton-bg">
      <div className="flex gap-4 items-center">
        <div className="h-4 w-4 border-2  rounded-full transition flex items-center justify-center"></div>
        <p className="font-bold transition">catégorie</p>
      </div>
      <Basketball />
    </div>
  );
}
