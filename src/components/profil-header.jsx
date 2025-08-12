"use client";
import Link from "next/link";
import { NavArrowRight } from "iconoir-react";
import CustomNav from "@/components/custom-nav";
import { usePathname } from "next/navigation";

export default function ProfilHeader({
  isLoading,
  eventPastCount,
  eventsCount,
}) {
  const pathname = usePathname();
  const isProfilRoute = pathname?.includes("/compte/profil/");

  const navigation = [
    { name: "Tickets", href: "/compte/profil/tickets" },
    { name: "Evenements", href: "/compte/profil/evenements" },
    { name: "Participations", href: "/compte/profil/participations" },
    { name: "Avis", href: "/compte/profil/avis" },
  ];

  return (
    <section className="profil-header">
      <div className="flex flex-col gap-6 justify-between w-full">
        {isProfilRoute ? (
          <Link href="/compte/parametres" className="primary-btn">
            <span>Paramètres du compte</span>
            <NavArrowRight />
          </Link>
        ) : (
          <Link href="/compte/profil/tickets" className="primary-btn">
            <span>Mon activité</span>
            <NavArrowRight />
          </Link>
        )}
        <div className="flex flex-wrap gap-6">
          <div>
            <p>Evenements passés</p>
            {isLoading ? (
              <p className="heavy skeleton-bg">00</p>
            ) : (
              <p className="heavy">{eventPastCount}</p>
            )}
          </div>
          <div>
            <p className="truncate">Evenements en cours</p>
            {isLoading ? (
              <p className="heavy skeleton-bg">00</p>
            ) : (
              <p className="heavy">{eventsCount}</p>
            )}
          </div>
        </div>
      </div>
      {isProfilRoute && (
        <CustomNav navigation={navigation} disabledHome={true} />
      )}
    </section>
  );
}
