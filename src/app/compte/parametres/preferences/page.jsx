"use client";
import ThemeButton from "@/components/buttons/theme-btn/theme-btn";
import { EditPencil } from "iconoir-react";
import { useState, useEffect } from "react";
import { useCategories } from "@/hooks/use-category";
import { useParametres } from "@/contexts/parametres-context";
import ThemeBtnSkeleton from "@/components/buttons/theme-btn/theme-btn-skeleton";
import { useUpdateCurrentUser } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";

export default function PreferencesPage() {
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const { token } = useAuth();
  const { user, isLoading: accountLoading } = useParametres();
  const { updateUser, loading } = useUpdateCurrentUser(token);

  const { categories, isLoading: categoriesLoading } = useCategories();

  const isLoading = categoriesLoading || accountLoading;

  useEffect(() => {
    if (user && user.categories) {
      setSelectedThemes(user.categories.map((cat) => cat.key));
    }
  }, [user]);

  const handleThemeToggle = (theme) => {
    setSelectedThemes((prevSelected) => {
      if (prevSelected.includes(theme)) {
        return prevSelected.filter((t) => t !== theme);
      } else {
        return [...prevSelected, theme];
      }
    });
  };

  const categoryKeys = selectedThemes;

  const handleUpdate = async () => {
    setSuccess(false);
    setError(null);
    try {
      await updateUser({ categoryKeys });
      setSuccess(true);
    } catch (e) {
      setError("Erreur lors de la mise à jour");
    }
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
          categories.map((category, index) => (
            <ThemeButton
              key={index}
              theme={category.key}
              label={category.name}
              isSelected={selectedThemes.includes(category.key)}
              onClick={() => handleThemeToggle(category.key)}
            />
          ))}
        {!isLoading && categories.length === 0 && (
          <p>Aucune catégorie disponible pour le moment</p>
        )}
      </div>
      <div className="flex flex-wrap gap-4 items-center justify-between">
        <button
          className="blue-rounded-btn"
          onClick={handleUpdate}
          disabled={loading}
        >
          <span>{loading ? "Modification..." : "Modifier"}</span>
          <EditPencil />
        </button>
        {success && (
          <span className="green-text">
            Les préférences ont été enregistrées
          </span>
        )}
        {error && (
          <span className="red-text">Erreur lors de la mise à jour</span>
        )}
      </div>
    </div>
  );
}
