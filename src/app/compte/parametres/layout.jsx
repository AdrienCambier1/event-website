"use client";
import { Copy, User, Settings, DatabaseScript, LogOut } from "iconoir-react";
import NavBtn from "@/components/buttons/nav-btn";
import CopyBtn from "@/components/buttons/copy-btn";
import { useParametres } from "@/contexts/parametres-context";
import DialogModal from "@/components/modals/dialog-modal";
import { useState } from "react";
import { useAuth } from "@/hooks/use-auth";

export default function ParametresLayout({ children }) {
  const [logoutModalOpen, setLogoutModalOpen] = useState(false);
  const { logoutUser } = useAuth();
  const { user, isLoading } = useParametres();

  return (
    <>
      <section className="container">
        <div className="flex flex-wrap justify-between border-b border-[var(--secondary-border-col)] gap-4 pb-4">
          <h2>Paramètres de votre compte</h2>
          {isLoading ? (
            <div className="copy-btn skeleton-bg">Pseudo</div>
          ) : (
            <CopyBtn id={user?.pseudo} />
          )}
        </div>
      </section>
      <section className="page-grid mt-8">
        <div className="z-10">
          <div className="flex flex-col gap-6 col-span-1 sticky top-20">
            <NavBtn
              icon={User}
              href="/compte/parametres"
              label="Aperçu du compte"
              isActive={true}
            />
            <NavBtn
              icon={DatabaseScript}
              href="/compte/parametres/informations"
              label="Données du compte"
            />
            <NavBtn
              icon={Settings}
              href="/compte/parametres/preferences"
              label="Préférences du compte"
            />
            <NavBtn
              icon={LogOut}
              onClick={() => setLogoutModalOpen(true)}
              label="Se déconnecter"
            />
          </div>
        </div>
        <div className="flex flex-col gap-12 lg:col-span-2">{children}</div>
      </section>
      <DialogModal
        isOpen={logoutModalOpen}
        setIsOpen={() => setLogoutModalOpen(false)}
        isDangerous={true}
        title="Se déconnecter"
        description="Souhaitez-vous vraiment vous déconnecter de votre compte ?"
        action="Se déconnecter"
        icon={LogOut}
        onClick={() => {
          logoutUser();
        }}
      />
    </>
  );
}
