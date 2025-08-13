"use client";
import ProfilList from "@/components/lists/profil-list";
import { useParams } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { usePlaceOrganizers } from "@/hooks/use-place";

export default function OrganisateursPage() {
  const { id } = useParams();
  const { token } = useAuth();

  const {
    organizers,
    loading: organizersLoading,
    error: organizersError,
  } = usePlaceOrganizers(id, token, 50);

  return (
    <ProfilList
      title="Les organisateurs du lieu"
      description="Organisateurs"
      organizers={organizers}
      isLoading={organizersLoading}
    />
  );
}
