"use client";
import { useState, useEffect } from "react";
import {
  fetchReviews,
  fetchReviewsWithUsers,
  createReview,
  deleteReview,
} from "@/services/review-service";

export function useReviews(page = 0, size = 10) {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadReviews = async (isRefetch = false) => {
    if (!isRefetch) {
      setLoading(true);
    }
    setError(null);

    try {
      const reviewsData = await fetchReviews(page, size);
      const enrichedReviews = reviewsData._embedded?.reviews || [];
      setReviews(enrichedReviews);
      return enrichedReviews;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erreur inconnue");
      setReviews([]);
      return [];
    } finally {
      if (!isRefetch) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    loadReviews();
  }, [page, size]);

  const refetch = async () => {
    return await loadReviews(true);
  };

  return { reviews, loading, error, refetch };
}

export function useCreateReview(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const [data, setData] = useState(null);

  const postReview = async (reviewData) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      const result = await createReview(reviewData, token);
      setData(result);
      setSuccess(true);
      return result;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setSuccess(false);
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { postReview, loading, error, success, data };
}

export function useDeleteReview(token) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const removeReview = async (reviewId) => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      await deleteReview(reviewId, token);
      setSuccess(true);
      return true;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setSuccess(false);
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { removeReview, loading, error, success };
}

export function useReviewsEnriched(page = 0, size = 10) {
  const [enrichedReviews, setEnrichedReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    setLoading(true);
    setError(null);

    try {
      const enrichedData = await fetchReviewsWithUsers(page, size);
      setEnrichedReviews(enrichedData);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue");
      setEnrichedReviews([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, size]);

  const refetch = async () => {
    return await fetchData();
  };

  return {
    reviews: enrichedReviews,
    loading,
    error,
    refetch,
  };
}
