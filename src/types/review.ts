export interface Review {
  content: string;
  rating: number;
  createdAt: string;
  senderUserId?: number | null;
  reviewedUserId?: number | null;
  reviewId?: number | null;
  senderUser?: any;
  _links?: any;
}

export interface ReviewsApiResponse {
  _embedded: {
    reviews: Review[];
  };
  _links: any;
  page?: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface CreateReviewRequest {
  content: string;
  rating: number;
  senderUserId: number;
  reviewedUserId: number;
}
