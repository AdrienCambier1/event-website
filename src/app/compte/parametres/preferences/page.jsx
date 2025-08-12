"use client";
import ThemeButton from "@/components/buttons/theme-btn";
import { EditPencil } from "iconoir-react";
import { useState } from "react";
import { useCategories } from "@/hooks/use-categories";
import { useParametres } from "@/contexts/parametres-context";
import ThemeBtnSkeleton from "@/components/buttons/theme-btn-skeleton";

export default function PreferencesPage() {
  const [selectedThemes, setSelectedThemes] = useState([]);

  const {
    categories,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  const { accountData, isLoading: accountLoading } = useParametres();

  const isLoading = categoriesLoading || accountLoading;

  const handleThemeToggle = (theme) => {
    setSelectedThemes((prevSelected) => {
      if (prevSelected.includes(theme)) {
        return prevSelected.filter((t) => t !== theme);
      } else {
        return [...prevSelected, theme];
      }
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <h3>Préférences du compte</h3>
      <div className="cards-grid">
        {isLoading && (
          <>
            <ThemeBtnSkeleton />
            <ThemeBtnSkeleton />
            <ThemeBtnSkeleton />
            <ThemeBtnSkeleton />
          </>
        )}
        {!isLoading &&
          categories.map((category) => (
            <ThemeButton
              key={category.key}
              theme={category.key}
              isSelected={selectedThemes.includes(category.name)}
              onClick={() => handleThemeToggle(category.name)}
            />
          ))}
        {!isLoading && categories.length === 0 && (
          <p>Aucune catégorie disponible pour le moment</p>
        )}
      </div>
      <div className="flex items-center justify-between">
        <button className="blue-rounded-btn">
          <span>Modifier</span>
          <EditPencil />
        </button>
      </div>
    </div>
  );
}
