import { Xmark, User, Search } from "iconoir-react";
import Link from "next/link";
import ModalBg from "./modal-bg";
import ReactFocusLock from "react-focus-lock";
import { useAuth } from "@/contexts/auth-context";
import ProfilBtn from "../buttons/profil-btn";
import CityBtn from "../buttons/city-btn";
import { useSearchModal } from "@/contexts/search-modal-context";

export default function MenuModal({ isOpen, setIsOpen }) {
  const { isAuthenticated } = useAuth();
  const { toggleSearchModal } = useSearchModal();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const navigation = [
    { href: "/evenements", label: "Événements" },
    { href: "/villes", label: "Les villes" },
    { href: "/lieux", label: "Les lieux" },
    { href: "/organisateurs", label: "Organisateurs" },
    { href: "/compte/parametres", label: "Paramètres" },
    {
      label: "Paramètres enfants",
      children: [
        { href: "/compte/parametres/informations", label: "Mes informations" },
        { href: "/compte/parametres/preferences", label: "Mes préférences" },
      ],
    },
    { href: "/compte/profil/tickets", label: "Mon activité" },
    {
      label: "Profil enfants",
      children: [
        { href: "/compte/profil/tickets", label: "Mes tickets" },
        { href: "/compte/profil/evenements", label: "Mes événements" },
        { href: "/compte/profil/participations", label: "Mes participations" },
        { href: "/compte/profil/favoris", label: "Mes favoris" },
        { href: "/compte/profil/avis", label: "Mes avis" },
      ],
    },
  ];

  return (
    <>
      <ReactFocusLock
        className={`${
          isOpen ? "visible -translate-x-0" : "invisible -translate-x-full"
        } menu-modal lg:hidden`}
      >
        <div className="flex flex-col gap-8">
          <div className="w-full flex gap-12 justify-between items-center h-16">
            <Link
              href="/"
              className="logo"
              onClick={(e) => {
                if (window.location.pathname === "/") {
                  e.preventDefault();
                  scrollToTop();
                  setIsOpen(false);
                } else {
                  setIsOpen(false);
                }
              }}
            >
              v<span>ee</span>vent
            </Link>
            <button className="blue-rounded-btn" onClick={setIsOpen}>
              <span>Fermer</span>
              <Xmark className="hamburger-menu" />
            </button>
          </div>
          <nav>
            <h4>Pages</h4>
            {navigation.map((item) =>
              item.children ? (
                <div key={item.label}>
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      onClick={setIsOpen}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link key={item.href} href={item.href} onClick={setIsOpen}>
                  {item.label}
                </Link>
              )
            )}
            <button
              onClick={() => {
                toggleSearchModal();
                setIsOpen(false);
              }}
              className="blue-rounded-btn"
              aria-label="Rechercher"
            >
              <span>Rechercher</span>
              <Search />
            </button>
          </nav>
        </div>
        {!isAuthenticated ? (
          <Link
            href="/connexion"
            className="primary-form-btn"
            onClick={setIsOpen}
          >
            <span>Se connecter</span>
            <User />
          </Link>
        ) : (
          <div className="flex items-center justify-end gap-4">
            <CityBtn reverse={true} onClick={setIsOpen} />
            <ProfilBtn reverse={true} onClick={setIsOpen} />
          </div>
        )}
      </ReactFocusLock>
      <ModalBg isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}
