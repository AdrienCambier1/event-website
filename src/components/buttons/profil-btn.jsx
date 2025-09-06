import { useState, useEffect, useRef } from "react";
import { LogOut } from "iconoir-react";
import Image from "next/image";
import Link from "next/link";
import profilPicture from "@/assets/images/profil-pic.jpg";
import { useAuth } from "@/hooks/use-auth";
import DialogModal from "../modals/dialog-modal";

export default function ProfilBtn({ reverse, onClick }) {
  const [profilDropdown, setProfilDropdown] = useState(false);
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { user, logoutUser, isAuthenticating } = useAuth();
  const profilDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profilDropdownRef.current &&
        !profilDropdownRef.current.contains(event.target)
      ) {
        setProfilDropdown(false);
      }
    };

    if (profilDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [profilDropdown]);

  const handleClose = () => {
    setProfilDropdown(false);
    onClick && onClick();
  };

  const handleLogout = () => {
    logoutUser();
    onClick && onClick();
  };

  const navigation = [
    { name: "Mon compte", href: "/compte/profil/tickets" },
    { name: "Paramètres", href: "/compte/parametres" },
  ];

  return (
    <>
      <div className="relative" ref={profilDropdownRef}>
        <button
          className="profil-btn relative"
          onClick={() => setProfilDropdown(!profilDropdown)}
        >
          <Image
            src={user?.imageUrl || profilPicture}
            alt="Profil picture"
            width={48}
            height={48}
            className="profil-pic-md"
          />
        </button>
        <div
          className={`
          ${profilDropdown ? "visible opacity-100" : "invisible opacity-0"}
           !w-fit right-0
          ${reverse ? "dropdown-parent-reverse" : "dropdown-parent"}
        `}
        >
          <p className="dropdown-text">{user?.pseudo || "Utilisateur"}</p>
          {navigation.map((item, index) => (
            <Link
              key={index}
              href={item.href}
              className="dropdown-child"
              onClick={handleClose}
            >
              {item.name}
            </Link>
          ))}
          <button
            className="dropdown-dangerous"
            onClick={() => setLogoutModalOpen(!logoutModalOpen)}
          >
            <span>Se déconnecter</span>
            <LogOut />
          </button>
        </div>
      </div>
      <DialogModal
        isOpen={logoutModalOpen}
        setIsOpen={() => setLogoutModalOpen(false)}
        isDangerous={true}
        title="Se déconnecter"
        description="Souhaitez-vous vraiment vous déconnecter de votre compte ?"
        action={isAuthenticating ? "Déconnexion..." : "Se déconnecter"}
        icon={LogOut}
        onClick={handleLogout}
      />
    </>
  );
}
