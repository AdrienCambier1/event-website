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

export const formatDateOnly = (dateString) => {
  return formatEventDate(dateString, { includeTime: false });
};

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
