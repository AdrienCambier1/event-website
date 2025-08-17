export async function search(query: string) {
  const res = await fetch(
    `https://veevent-backend.onrender.com/api/v1/search?query=${encodeURIComponent(
      query
    )}`
  );
  if (!res.ok) throw new Error("Erreur lors de la recherche");
  return res.json();
}
