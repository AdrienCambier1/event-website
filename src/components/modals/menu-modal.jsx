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
            <Link href="/evenements" onClick={setIsOpen}>
              Evenements
            </Link>
            <Link href="/villes" onClick={setIsOpen}>
              Les villes
            </Link>

            <Link href="/lieux" onClick={setIsOpen}>
              Les lieux
            </Link>
            <Link href="/compte/parametres" onClick={setIsOpen}>
              Paramètres
            </Link>
            <div>
              <Link href="/compte/parametres/informations" onClick={setIsOpen}>
                Mes informations
              </Link>
              <Link href="/compte/parametres/preferences" onClick={setIsOpen}>
                Mes préférences
              </Link>
            </div>
            <Link href="/compte/profil/tickets" onClick={setIsOpen}>
              Mon activité
            </Link>
            <div>
              <Link href="/compte/profil/tickets" onClick={setIsOpen}>
                Mes tickets
              </Link>
              <Link href="/compte/profil/evenements" onClick={setIsOpen}>
                Mes événements
              </Link>
              <Link href="/compte/profil/participations" onClick={setIsOpen}>
                Mes participations
              </Link>
              <Link href="/compte/profil/avis" onClick={setIsOpen}>
                Mes avis
              </Link>
            </div>
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
