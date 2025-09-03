"use client";
import Link from "next/link";
import { NavArrowRight } from "iconoir-react";
import CustomNav from "@/components/commons/custom-nav";
import { usePathname } from "next/navigation";
import ThemeTags from "./theme-tags";

export default function ProfilHeader({
  isLoading,
  eventPastCount,
  eventsCount,
  description,
  themes,
  navigation,
  isRegistered,
  disabledHome = false,
}) {
  const pathname = usePathname();
  const isProfilRoute = pathname?.includes("/compte/profil/");
  const isOrganisateurRoute = pathname?.includes("/organisateurs/");
  const shouldShowNav = isProfilRoute || isOrganisateurRoute;

  return (
    <section className="profil-header">
      <div className="flex flex-col gap-6 justify-between w-full">
        {isRegistered &&
          (isProfilRoute ? (
            <Link href="/compte/parametres" className="primary-btn">
              <span>Paramètres du compte</span>
              <NavArrowRight />
            </Link>
          ) : (
            <Link href="/compte/profil/tickets" className="primary-btn">
              <span>Mon activité</span>
              <NavArrowRight />
            </Link>
          ))}
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
        {description && <p>{description}</p>}
        <ThemeTags themes={themes} />
      </div>
      {shouldShowNav && (
        <CustomNav
          navigation={navigation}
          homeLink="/organisateurs"
          disabledHome={disabledHome}
        />
      )}
    </section>
  );
}
