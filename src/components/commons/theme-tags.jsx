import { getThemeIcon } from "@/utils/theme-icons";

export default function ThemeTags({ themes = [] }) {
  return (
    <div className="flex flex-wrap gap-2 w-full">
      {themes.map((theme, index) => {
        const themeName = typeof theme === "string" ? theme : theme.name;
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
