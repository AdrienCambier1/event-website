"use client";
import InformationsCard from "@/components/cards/informations-card/informations-card";
import { User, Phone, Lock, Text } from "iconoir-react";
import SettingsModal from "@/components/modals/settings-modal";
import { useState } from "react";
import { useParametres } from "@/contexts/parametres-context";
import InformationsCardSkeleton from "@/components/cards/informations-card/informations-card-skeleton";

export default function InformationsPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("name");
  const { user, isLoading, accountError } = useParametres();

  const openModal = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <>
      <div className="flex flex-col gap-6">
        <h3>Données du compte</h3>
        <div className="cards-grid">
          {isLoading ? (
            <>
              <InformationsCardSkeleton />
              <InformationsCardSkeleton />
              <InformationsCardSkeleton />
              <InformationsCardSkeleton />
            </>
          ) : (
            <>
              <InformationsCard
                icon={User}
                title="Nom prénom et pseudo"
                description={
                  `${user?.firstName || ""} ${user?.lastName || ""} @${
                    user?.pseudo || ""
                  }`.trim() || "Non renseigné"
                }
                onClick={() => openModal("name")}
              />
              <InformationsCard
                icon={Phone}
                title="Numéro de téléphone"
                description={user?.phone || "Non renseigné"}
                onClick={() => openModal("phone")}
              />
              <InformationsCard
                icon={Text}
                title="Description"
                description={user?.description || "Non renseigné"}
                onClick={() => openModal("description")}
              />
              <InformationsCard
                icon={Lock}
                title="Mot de passe"
                description="Pour une meilleure sécurité, pensez à mettre à jour votre mot de passe."
                onClick={() => openModal("password")}
              />
            </>
          )}
        </div>
      </div>
      <SettingsModal
        isOpen={isModalOpen}
        setIsOpen={() => setIsModalOpen(false)}
        type={modalType}
        user={user}
      />
    </>
  );
}
