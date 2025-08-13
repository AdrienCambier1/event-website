const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function authenticateUser(credentials) {
  const res = await fetch(`${API_URL}/auth/authenticate`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!res.ok) {
    const statusErrors = {
      401: "Email ou mot de passe incorrect",
      400: "Données invalides",
      500: "Erreur serveur, veuillez réessayer",
    };
    throw new Error(statusErrors[res.status] || "Erreur de connexion");
  }

  return res.json(); // { token }
}

export async function registerUser(userData) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(userData),
  });

  if (!res.ok) {
    const statusErrors = {
      400: "Données invalides ou email déjà utilisé",
      500: "Un compte avec cet email existe déjà. Veuillez essayer avec une autre adresse email.",
    };
    throw new Error(statusErrors[res.status] || "Erreur lors de l'inscription");
  }

  return res.json(); // { token, user }
}

export async function logoutUser() {
  // Pas d'endpoint de logout dans ton API, juste nettoyage local
  return true;
}
