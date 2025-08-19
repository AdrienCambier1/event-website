"use client";
import { Plus, Check, CloudXmark } from "iconoir-react";
import { useRouter, usePathname } from "next/navigation";
import { useAddEventParticipants } from "@/hooks/use-event";
import { useInvitation } from "@/hooks/use-invitation";
import DialogModal from "@/components/modals/dialog-modal";
import PaymentModal from "@/components/modals/payment-modal";
import { useState } from "react";
import Link from "next/link";

export default function TicketCard({
  title,
  description,
  price,
  eventId,
  isInvitationOnly,
  organizer,
  isAuthenticated,
  user,
  token,
  isDisabled,
}) {
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [paymentError, setPaymentError] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { addParticipants, loading: addLoading } = useAddEventParticipants();
  const { sendInvitation, loading: invitationLoading } = useInvitation();

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push(`/connexion?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setPaymentModal(true);
    }
  };

  const handleSubmit = async () => {
    try {
      if (isInvitationOnly) {
        await sendInvitation(
          eventId,
          user.id,
          token,
          `Demande d'invitation à l'événement ${title}`
        );
      } else {
        await addParticipants(eventId, [user.id], token);
      }
      setPaymentSuccess(true);
      setPaymentModal(false);
    } catch (e) {
      setPaymentError(true);
      setPaymentModal(false);
    }
  };

  return (
    <>
      <div className="ticket-card">
        <div className="bg-circle h-60 w-60 top-0 -translate-y-1/2 -translate-x-1/2 left-0" />
        <div className="bg-circle h-32 w-32 bottom-0 -translate-x-1/2 left-0" />
        <div className="dark-gradient p-6 flex flex-col gap-6 justify-between">
          <div className="flex flex-col gap-4">
            <h3>{title}</h3>
            <p>{description}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-xl font-bold">{price}€</p>
            <button
              className="primary-btn"
              onClick={handleClick}
              disabled={addLoading || isDisabled}
            >
              <span>Réserver</span>
              <Plus />
            </button>
          </div>
        </div>
      </div>
      <PaymentModal
        isOpen={paymentModal}
        setIsOpen={() => setPaymentModal(false)}
        onClick={handleSubmit}
        ticket={title}
        price={price}
        isLoading={isInvitationOnly ? invitationLoading : addLoading}
      />
      <DialogModal
        title="Achat effectué"
        isOpen={paymentSuccess}
        setIsOpen={() => setPaymentSuccess(false)}
        icon={Check}
        description={
          isInvitationOnly ? (
            <>
              Votre inscription pour l'événement{" "}
              <span className="dark-text">{title}</span> a bien été prise en
              compte. Vous recevrez votre billet dans la rubrique{" "}
              <Link
                href="/compte/profil/tickets"
                className="blue-text underline"
              >
                tickets
              </Link>{" "}
              de votre profil sous acceptation par{" "}
              <span className="dark-text">{organizer}</span>.
            </>
          ) : (
            <>
              L'achat de votre billet pour l'événement{" "}
              <span className="dark-text">{title}</span> a bien été effectué.
              Retrouver votre billet dans la rubrique{" "}
              <Link
                href="/compte/profil/tickets"
                className="blue-text underline"
              >
                tickets
              </Link>{" "}
              de votre profil.
            </>
          )
        }
      />
      <DialogModal
        title="Impossible de s'inscrire"
        isOpen={paymentError}
        setIsOpen={() => setPaymentError(false)}
        icon={CloudXmark}
        isDangerous={true}
        description={
          <>
            Erreur lors de l'achat du billet pour l'événement{" "}
            <span className="dark-text">{title}</span>.
          </>
        }
      />
    </>
  );
}
