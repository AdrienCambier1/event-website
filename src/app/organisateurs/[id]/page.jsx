import { redirect } from "next/navigation";

export default function OrganisateurPage({ params }) {
  const { id } = params;

  redirect(`/organisateurs/${id}/evenements`);
}
