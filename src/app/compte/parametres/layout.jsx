"use client";
import { Copy, User, Settings, DatabaseScript } from "iconoir-react";
import NavBtn from "@/components/buttons/nav-btn";
import CopyBtn from "@/components/buttons/copy-btn";
import { useParametres } from "@/contexts/parametres-context";

export default function ParametresLayout({ children }) {
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
        <div className="flex flex-col gap-6 col-span-1">
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
        </div>
        <div className="flex flex-col gap-12 lg:col-span-2">{children}</div>
      </section>
    </>
  );
}
