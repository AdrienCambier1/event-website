"use client";
import { useState, useEffect } from "react";
import { fetchReviews, createReview } from "@/services/review-service";

export function useReviews(page = 0, size = 10) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadReviews = async () => {
      try {
        setLoading(true);
        setError(null);
        const reviewsData = await fetchReviews(page, size);
        setReviews(reviewsData._embedded?.reviews || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erreur inconnue");
        setReviews([]);
      } finally {
        setLoading(false);
      }
    };

    loadReviews();
  }, [page, size]);

  const refetch = async () => {
    try {
      setLoading(true);
      setError(null);
      const reviewsData = await fetchReviews(page, size);
      setReviews(reviewsData._embedded?.reviews || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  return { reviews, loading, error, refetch };
}

export function useCreateReview(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const postReview = async (reviewData) => {
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const result = await createReview(reviewData, token);
      setData(result);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setData(null);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { postReview, loading, error, data };
}
