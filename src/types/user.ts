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

export interface Ticket {
  id: number;
  name: string;
  lastName: string | null;
  description: string;
  unitPrice: number;
}

export interface Order {
  id: number;
  totalPrice: number;
  ticketToBeCreated: number;
  tickets: Ticket[];
  _links: {
    self: { href: string };
    tickets: { href: string };
    users: { href: string };
    events: { href: string };
  };
}

export interface UserOrdersResponse {
  _embedded: {
    orderResponses: Order[];
  };
  _links: {
    self: { href: string };
  };
}

export interface UserUpdateRequest {
  firstName?: string;
  lastName?: string;
  pseudo?: string;
  email?: string;
  password?: string;
  phone?: string | null;
  description?: string | null;
  imageUrl?: string | null;
  bannerUrl?: string | null;
  socials?: string | null;
  categoryKeys?: string[];
  note?: number | null;
}

export interface OrderData {
  ticketToBeCreated: number;
  totalPrice: number;
  eventId: number;
  userId: number;
}

export interface TicketData {
  name: string;
  lastName: string;
  description: string;
  unitPrice: number;
  orderId: number;
}
