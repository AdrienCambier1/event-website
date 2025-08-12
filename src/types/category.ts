export interface Category {
  name: string;
  description: string;
  key: string;
  trending: boolean;
  _links?: any;
}

export interface CategoriesApiResponse {
  _embedded: {
    categories: Category[];
  };
  _links?: any;
}
