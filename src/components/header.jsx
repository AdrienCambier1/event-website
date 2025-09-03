"use client";
import Link from "next/link";
import { NavArrowRight, MenuScale, LogOut, Search } from "iconoir-react";
import MenuModal from "./modals/menu-modal";
import { useState, useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import ProfilBtn from "./buttons/profil-btn";
import CityBtn from "./buttons/city-btn";
import { useSearchModal } from "@/contexts/search-modal-context";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const { isAuthenticated, loading } = useAuth();
  const { toggleSearchModal } = useSearchModal();
  const [isOpen, setIsOpen] = useState(false);

  const hideOnAuthPages =
    pathname.startsWith("/connexion") ||
    pathname.startsWith("/inscription") ||
    pathname.startsWith("/auth/callback");

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024 && isOpen) {
        setIsOpen(false);
      }
    };

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isOpen]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      <header>
        <div className="container flex gap-8 justify-between items-center h-16">
          <Link
            href="/"
            className="logo"
            onClick={(e) => {
              if (window.location.pathname === "/") {
                e.preventDefault();
                scrollToTop();
              }
            }}
          >
            v<span>ee</span>vent
          </Link>
          {!hideOnAuthPages && (
            <>
              <button
                className="lg:hidden blue-rounded-btn"
                onClick={() => setIsOpen(!isOpen)}
              >
                <span>Menu</span>
                <MenuScale className="hamburger-menu" />
              </button>
              <nav>
                <Link href="/evenements">Evenements</Link>
                <Link href="/villes">Les villes</Link>
                <Link href="/lieux">Les lieux</Link>
                <Link href="/organisateurs">Organisateurs</Link>
              </nav>
              <div className="hidden lg:flex items-center gap-4">
                {!loading && (
                  <button
                    onClick={toggleSearchModal}
                    className="blue-rounded-btn"
                    aria-label="Rechercher"
                  >
                    <span>Rechercher</span>
                    <Search />
                  </button>
                )}
                {loading ? (
                  <>
                    <div className="skeleton-btn">primary</div>
                    <div className="skeleton-btn">secondary</div>
                  </>
                ) : !isAuthenticated ? (
                  <>
                    <Link href="/inscription" className="secondary-btn">
                      <span>S'inscrire</span>
                      <NavArrowRight />
                    </Link>
                    <Link href="/connexion" className="primary-btn">
                      <span>Se connecter</span>
                      <NavArrowRight />
                    </Link>
                  </>
                ) : (
                  <>
                    <CityBtn />
                    <ProfilBtn />
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </header>
      <MenuModal isOpen={isOpen} setIsOpen={() => setIsOpen()} />
    </>
  );
}
