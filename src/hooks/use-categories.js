import { useState, useEffect } from "react";
import { fetchCategories } from "@/services/fetch-categories";

export function useCategories() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const shouldShowSkeleton = loading || error !== null;

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetchCategories();
        setCategories(response._embedded.categories);
      } catch (err) {
        console.error("Erreur lors du chargement des catégories:", err);
        setError(err.message);
        setCategories([
          { name: "Musique", key: "musique", description: "", trending: false },
          { name: "Sport", key: "sport", description: "", trending: false },
          {
            name: "Technologie",
            key: "technologie",
            description: "",
            trending: false,
          },
          { name: "Études", key: "etudes", description: "", trending: false },
        ]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, []);

  const filterOptions = categories.map((category) => ({
    label: category.name,
    value: category.key.toLowerCase(),
  }));

  const trendingCategories = categories.filter((category) => category.trending);

  return {
    categories,
    filterOptions,
    trendingCategories,
    loading: shouldShowSkeleton,
    error,
  };
}
