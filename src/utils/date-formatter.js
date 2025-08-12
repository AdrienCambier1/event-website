/**
 * Formate une date en français avec jour, date et heure
 * @param {string|Date} dateString - La date à formater
 * @param {Object} options - Options de formatage
 * @returns {string} Date formatée
 */
export const formatEventDate = (dateString, options = {}) => {
  if (!dateString) return "Date non définie";

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Date invalide";
    }

    const {
      includeTime = true,
      includeDayName = true,
      separator = " • ",
      fallback = "Date non disponible",
    } = options;

    let formattedDate = date.toLocaleDateString("fr-FR", {
      ...(includeDayName && { weekday: "long" }),
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    if (includeTime) {
      const formattedTime = date.toLocaleTimeString("fr-FR", {
        hour: "2-digit",
        minute: "2-digit",
      });
      formattedDate += separator + formattedTime;
    }

    return formattedDate;
  } catch (error) {
    console.error("Erreur lors du formatage de la date:", error);
    return options.fallback || "Date invalide";
  }
};

/**
 * Formate uniquement la date (sans l'heure)
 * @param {string|Date} dateString - La date à formater
 * @returns {string} Date formatée sans l'heure
 */
export const formatDateOnly = (dateString) => {
  return formatEventDate(dateString, { includeTime: false });
};

/**
 * Formate uniquement l'heure
 * @param {string|Date} dateString - La date à formater
 * @returns {string} Heure formatée
 */
export const formatTimeOnly = (dateString) => {
  if (!dateString) return "Heure non définie";

  try {
    const date = new Date(dateString);

    if (isNaN(date.getTime())) {
      return "Heure invalide";
    }

    return date.toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch (error) {
    console.error("Erreur lors du formatage de l'heure:", error);
    return "Heure invalide";
  }
};
