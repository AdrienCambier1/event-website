import Link from "next/link";
import { getThemeIcon } from "@/utils/theme-icons";

export default function ThemeCard({ theme = "musique", title, description }) {
  const iconClasses = "group-hover:text-white";

  return (
    <Link href={`/evenements?theme=${theme}`} className="theme-card group">
      <div className="flex flex-col items-center justify-center gap-2">
        {getThemeIcon(theme, iconClasses)}
        <p className="group-hover:text-white transition">{title || theme}</p>
      </div>
    </Link>
  );
}
