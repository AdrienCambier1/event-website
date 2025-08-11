import { getThemeIcon } from "@/utils/theme-icons";

export default function ThemeTags({ theme = [] }) {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {theme.map((item, index) => {
        const themeName = typeof item === "string" ? item : item.name;
        return (
          <div key={index} className="green-tag">
            {getThemeIcon(themeName, "h-4 w-4")}
            <span>{themeName}</span>
          </div>
        );
      })}
    </div>
  );
}
