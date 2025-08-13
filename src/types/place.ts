export interface Location {
  latitude: number;
  longitude: number;
}

export interface Place {
  id: number;
  name: string;
  address: string;
  slug: string;
  type: string;
  location: Location;
  eventsCount: number;
  eventsPastCount: number;
  cityName: string;
  bannerUrl: string | null;
  imageUrl: string | null;
  description: string;
  content: string;
  _links?: any;
}

export interface PlacesApiResponse {
  _embedded: {
    placeResponses: Place[];
  };
  _links?: any;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}
