import { getThemeIcon } from "@/utils/theme-icons";

export default function ThemeBtn({
  theme = "musique",
  label = "Musique",
  onClick,
  isSelected,
}) {
  const iconClasses = `${isSelected && "!text-white"} `;

  return (
    <button
      type="button"
      className={`${isSelected && "!bg-[var(--primary-blue)]"} theme-btn group`}
      onClick={onClick}
    >
      <div className="flex gap-4 items-center">
        <div
          className={`${
            isSelected ? "border-white" : "border-[var(--primary-blue)]"
          } h-4 w-4 border-2  rounded-full transition flex items-center justify-center`}
        >
          {isSelected && <div className="h-2 w-2 bg-white rounded-full" />}
        </div>
        <p
          className={`${
            isSelected ? "text-white" : "text-[var(--primary-blue)]"
          } font-bold  transition`}
        >
          {label}
        </p>
      </div>
      {getThemeIcon(theme, iconClasses)}
    </button>
  );
}
