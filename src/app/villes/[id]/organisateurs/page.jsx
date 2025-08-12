"use client";
import ProfilList from "@/components/lists/profil-list";
import { useParams } from "next/navigation";
import { useCityOrganizers } from "@/hooks/use-city-organizers";
import { useAuth } from "@/hooks/use-auth";

export default function OrganisateursPage() {
  const { id } = useParams();
  const { token } = useAuth();

  const {
    data: organizersData,
    organizers,
    loading: organizersLoading,
    error: organizersError,
  } = useCityOrganizers(id, token, 50);

  return (
    <ProfilList
      title="Les organisateurs de la ville"
      description="Organisateurs"
      organizers={organizers}
      isLoading={organizersLoading}
    />
  );
}
