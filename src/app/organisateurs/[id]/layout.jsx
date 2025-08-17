"use client";
import Image from "next/image";
import nice4k from "@/assets/images/nice4k.jpg";
import ProfilCard from "@/components/cards/profil-card";
import ProfilHeader from "@/components/commons/profil-header";
import { useUserById } from "@/hooks/use-user";
import { notFound, useParams } from "next/navigation";

export default function OrganisateurLayout({ children }) {
  const { id } = useParams();

  const navigation = [
    { name: "Evenements", href: `/organisateurs/${id}/evenements` },
    { name: "Avis", href: `/organisateurs/${id}/avis` },
  ];

  const {
    user: organizerData,
    loading: organizerLoading,
    error: organizerError,
  } = useUserById(id);

  if (organizerError) {
    notFound();
  }

  return (
    <main>
      <section className="container">
        {organizerLoading ? (
          <>
            <h1 className="skeleton-bg">Un organisateur</h1>
            <div className="banner skeleton-bg"></div>
          </>
        ) : (
          <>
            <h1>Profil organisateur</h1>
            <div className="relative">
              <Image
                src={organizerData?.bannerUrl || nice4k}
                alt="Organizer banner"
                width={800}
                height={450}
                className="banner"
              />
              {!organizerLoading && (
                <ProfilCard
                  profilId={organizerData?.id}
                  name={`${organizerData?.firstName} ${organizerData?.lastName}`}
                  pseudo={organizerData?.pseudo}
                  note={organizerData?.note}
                  role={organizerData?.role}
                  imageUrl={organizerData?.imageUrl}
                />
              )}
            </div>
          </>
        )}
      </section>
      <ProfilHeader
        isLoading={organizerLoading}
        eventPastCount={organizerData?.eventPastCount}
        eventsCount={organizerData?.eventsCount}
        navigation={navigation}
        isRegistered={false}
      />
      {children}
    </main>
  );
}
