// Types pour l'inscription utilisateur

export interface RegisterFormData {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
  description: string;
  phone: string;
  interests: string[];
}

export interface RegisterApiData {
  firstName: string;
  lastName: string;
  pseudo: string;
  email: string;
  password: string;
  phone: string;
  description: string;
  categoryKeys: string[];
}

export interface RegisterResponse {
  token: string;
  user: {
    id: number;
    firstName: string;
    lastName: string;
    pseudo: string;
    email: string;
    phone?: string;
    description?: string;
    imageUrl?: string;
    role: string;
  };
}
