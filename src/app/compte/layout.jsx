"use client";
import Image from "next/image";
import nice4k from "@/assets/images/nice4k.jpg";
import ProfilCard from "@/components/cards/profil-card";
import ProfilHeader from "@/components/commons/profil-header";
import { useAuth } from "@/hooks/use-auth";
import { useCurrentUser } from "@/hooks/use-user";
import { usePathname } from "next/navigation";
import {
  ParametresProvider,
  useParametres,
} from "@/contexts/parametres-context";
import { useEffect } from "react";

export default function CompteLayout({ children }) {
  const { token, isAuthenticated } = useAuth();
  const { setUser, setAccountError, setIsLoading, user } = useParametres();

  const {
    user: userData,
    loading: accountLoading,
    error: userAccountError,
  } = useCurrentUser(isAuthenticated ? token : null);

  const navigation = [
    { name: "Tickets", href: "/compte/profil/tickets" },
    { name: "Evenements", href: "/compte/profil/evenements" },
    { name: "Participations", href: "/compte/profil/participations" },
    { name: "Avis", href: "/compte/profil/avis" },
  ];

  useEffect(() => {
    setUser(userData);
    setAccountError(userAccountError);
    setIsLoading(accountLoading);
  }, [
    userData,
    userAccountError,
    accountLoading,
    setUser,
    setAccountError,
    setIsLoading,
  ]);

  return (
    <main>
      <section className="container">
        <h1>Mon profil</h1>
        <div className="relative">
          {accountLoading ? (
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
          {!accountLoading && (
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
        isLoading={accountLoading}
        eventPastCount={user?.eventPastCount}
        eventsCount={user?.eventsCount}
        navigation={navigation}
        isRegistered={true}
        disabledHome={true}
      />
      {children}
    </main>
  );
}
