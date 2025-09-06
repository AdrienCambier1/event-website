"use client";
import { EditPencil } from "iconoir-react";
import { useState, useEffect } from "react";
import { useCategories } from "@/hooks/use-category";
import { useParametres } from "@/contexts/parametres-context";
import ThemeBtnSkeleton from "@/components/buttons/theme-btn/theme-btn-skeleton";
import { useUpdateCurrentUser, useCurrentUser } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import ThemeBtn from "@/components/buttons/theme-btn/theme-btn";
import Link from "next/link";

export default function PreferencesPage() {
  const [selectedThemes, setSelectedThemes] = useState([]);
  const [loadingRole, setLoadingRole] = useState(false);
  const [successRole, setSuccessRole] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(false);
  const [successCategories, setSuccessCategories] = useState(false);
  const { token } = useAuth();
  const { user, isLoading: accountLoading, setUser } = useParametres();
  const { categories, isLoading: categoriesLoading } = useCategories();
  const { updateUser } = useUpdateCurrentUser(token);
  const { refetch } = useCurrentUser(token);

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

  const handleUpdateCategories = async () => {
    if (loadingCategories) return;

    setLoadingCategories(true);
    setSuccessCategories(null);

    try {
      await updateUser({ categoryKeys });
      const refreshed = await refetch();
      setUser(refreshed);
    } catch (e) {
      console.log("Erreur lors de la mise à jour");
    } finally {
      setLoadingCategories(false);
      setSuccessCategories(true);
    }
  };

  const handleBecomeOrganizer = async (e) => {
    e.preventDefault();

    if (loadingRole) return;

    setLoadingRole(true);
    setSuccessRole(null);

    try {
      await updateUser({ role: "Organizer" });
      const refreshed = await refetch();
      setUser(refreshed);
    } catch (e) {
      console.log("Erreur lors du changement de rôle");
    } finally {
      setLoadingRole(false);
      setSuccessRole(true);
    }
  };

  const role = user?.role?.toLowerCase();
  const canManageEvents = role === "organizer" || role === "admin";

  return (
    <>
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
              <ThemeBtn
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
            onClick={handleUpdateCategories}
            disabled={loadingCategories}
          >
            <span>{loadingCategories ? "Modification..." : "Modifier"}</span>
            <EditPencil />
          </button>
          {successCategories && (
            <p className="green-text">Les préférences ont été enregistrées</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6">
        <h3>Gérez vos événements</h3>
        {isLoading ? (
          <>
            <p className="skeleton-bg">
              Devenir organisateur ou être redirigé vers l'interface
              d'administration
            </p>
            <button className="skeleton-btn">
              <span>Rôle ou redirection</span>
            </button>
          </>
        ) : (
          <>
            <p>
              {canManageEvents
                ? "Gérez vos événements depuis notre interface d'administration."
                : "Devenez organisateur et gérez vos événements facilement depuis notre interface d'administration."}
            </p>
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {canManageEvents ? (
                <Link
                  href="https://veevent-admin.vercel.app/"
                  className="primary-btn"
                  target="_blank"
                >
                  <span>Accéder à l'administration</span>
                </Link>
              ) : (
                <button
                  className="primary-btn"
                  onClick={handleBecomeOrganizer}
                  disabled={loadingRole}
                >
                  <span>
                    {loadingRole
                      ? "Changement en cours..."
                      : "Devenir organisateur"}
                  </span>
                </button>
              )}
              {successRole && (
                <p className="green-text">Vous êtes désormais organisateur</p>
              )}
            </div>
          </>
        )}
      </div>
    </>
  );
}
