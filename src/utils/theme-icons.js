import { Headset, Basketball, Book, Computer, Megaphone } from "iconoir-react";

// Mapping des icônes par thème/catégorie
export const themeIcons = {
  musique: Headset,
  sport: Basketball,
  etudes: Book,
  technologie: Computer,
  sponsorisé: Megaphone,
};

// Fonction pour normaliser les noms de thèmes (supprime accents, etc.)
export const getNormalizedKey = (themeName) => {
  return themeName
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
};

// Fonction pour obtenir l'icône d'un thème avec des classes CSS personnalisées
export const getThemeIcon = (themeName, className = "") => {
  const normalizedName = getNormalizedKey(themeName);
  const IconComponent = themeIcons[normalizedName];

  return IconComponent ? <IconComponent className={className} /> : null;
};

// Fonction pour vérifier si un thème a une icône
export const hasThemeIcon = (themeName) => {
  const normalizedName = getNormalizedKey(themeName);
  return Boolean(themeIcons[normalizedName]);
};
