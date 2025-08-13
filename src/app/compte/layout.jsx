"use client";
import Image from "next/image";
import nice4k from "@/assets/images/nice4k.jpg";
import ProfilCard from "@/components/cards/profil-card";
import ProfilHeader from "@/components/commons/profil-header";
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
    user,
    loading: accountLoading,
    error: accountError,
  } = useCurrentUser(isAuthenticated ? token : null);

  const isLoading = authLoading || accountLoading;

  const shouldShowSkeleton =
    isLoading || (isAuthenticated && !user && !accountError);

  const isParametresSection = pathname?.startsWith("/compte/parametres");

  const childrenContent = isParametresSection ? (
    <ParametresProvider
      user={user}
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
              src={user?.bannerUrl || nice4k}
              alt="City image"
              width={800}
              height={450}
              className="banner"
            />
          )}
          {!shouldShowSkeleton && (
            <ProfilCard
              profilId={user?.id}
              name={`${user?.firstName} ${user?.lastName}`}
              pseudo={user?.pseudo}
              note={user?.note}
              role={user?.role}
              imageUrl={user?.imageUrl}
            />
          )}
        </div>
      </section>
      <ProfilHeader
        isLoading={shouldShowSkeleton}
        eventPastCount={user?.eventPastCount}
        eventsCount={user?.eventsCount}
        navigation={navigation}
        isRegistered={true}
      />
      {childrenContent}
    </main>
  );
}
