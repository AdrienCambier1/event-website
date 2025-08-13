"use client";
import Image from "next/image";
import nice4k from "@/assets/images/nice4k.jpg";
import ProfilCard from "@/components/cards/profil-card";
import ProfilHeader from "@/components/profil-header";
import { useAuth } from "@/hooks/use-auth";
import { useCurrentUser } from "@/hooks/use-user";
import { usePathname } from "next/navigation";
import { ParametresProvider } from "@/contexts/parametres-context";

export default function CompteLayout({ children }) {
  const { token, isAuthenticated, loading: authLoading } = useAuth();
  const pathname = usePathname();

  const navigation = [
    { name: "Tickets", href: "/compte/profil/tickets" },
    { name: "Evenements", href: "/compte/profil/evenements" },
    { name: "Participations", href: "/compte/profil/participations" },
    { name: "Avis", href: "/compte/profil/avis" },
  ];

  const {
    user: accountData,
    loading: accountLoading,
    error: accountError,
  } = useCurrentUser(isAuthenticated ? token : null);

  const isLoading = authLoading || accountLoading;

  const shouldShowSkeleton =
    isLoading || (isAuthenticated && !accountData && !accountError);

  const isParametresSection = pathname?.startsWith("/compte/parametres");

  const childrenContent = isParametresSection ? (
    <ParametresProvider
      accountData={accountData}
      isLoading={shouldShowSkeleton}
      accountError={accountError}
    >
      {children}
    </ParametresProvider>
  ) : (
    children
  );

  return (
    <main>
      <section className="container">
        <h1>Mon profil</h1>
        <div className="relative">
          {shouldShowSkeleton ? (
            <div className="banner skeleton-bg"></div>
          ) : (
            <Image
              src={accountData?.bannerUrl || nice4k}
              alt="City image"
              width={800}
              height={450}
              className="banner"
            />
          )}
          {!shouldShowSkeleton && (
            <ProfilCard
              profilId={accountData?.id}
              name={`${accountData?.firstName} ${accountData?.lastName}`}
              pseudo={accountData?.pseudo}
              note={accountData?.note}
              role={accountData?.role}
              imageUrl={accountData?.imageUrl}
            />
          )}
        </div>
      </section>
      <ProfilHeader
        isLoading={shouldShowSkeleton}
        eventPastCount={accountData?.eventPastCount}
        eventsCount={accountData?.eventsCount}
        navigation={navigation}
        isRegistered={true}
      />
      {childrenContent}
    </main>
  );
}
