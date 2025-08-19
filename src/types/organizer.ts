export interface OrganizersApiResponse {
  _embedded: {
    organizerResponses: Organizer[];
  };
  _links?: any;
  page: {
    size: number;
    totalElements: number;
    totalPages: number;
    number: number;
  };
}

export interface Social {
  platform: string;
  url: string;
}

export interface Category {
  name: string;
  key: string;
}

export interface Organizer {
  id: number;
  lastName: string;
  firstName: string;
  pseudo: string;
  slug: string;
  email: string;
  phone: string;
  eventPastCount: number;
  eventsCount: number;
  role: string;
  description: string;
  imageUrl: string | null;
  bannerUrl: string | null;
  socials: Social[];
  categories: Category[];
  note: number | null;
  _links?: any;
}

export interface CityOrganizersResponse {
  _embedded: {
    userResponses: Organizer[];
  };
  _links?: any;
}
