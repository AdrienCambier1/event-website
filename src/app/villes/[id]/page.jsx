import { redirect } from "next/navigation";

export default function VillePage({ params }) {
  const { id } = params;

  redirect(`/villes/${id}/evenements`);
}
