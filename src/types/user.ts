import { Category } from "./organizer";

export interface UserSocial {
  name: string;
  url: string;
}

export interface User {
  id: number;
  lastName: string;
  firstName: string;
  pseudo: string;
  slug: string;
  email: string;
  phone: string | null;
  eventPastCount: number;
  eventsCount: number;
  role: string;
  description: string;
  imageUrl: string | null;
  bannerUrl: string | null;
  socials: UserSocial[];
  categories: Category[];
  note: number | null;
  _links?: any;
}

export interface CurrentUserResponse extends User {}

export interface UserByIdResponse extends User {}
