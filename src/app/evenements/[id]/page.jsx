"use client";
import { useParams } from "next/navigation";
import Image from "next/image";
import niceImage from "@/assets/images/nice.jpg";
import {
  Bookmark,
  Calendar,
  Check,
  Group,
  HomeAltSlim,
  MapPin,
} from "iconoir-react";
import ThemeTags from "@/components/theme-tags";
import ProfilCard from "@/components/cards/profil-card";
import ItemList from "@/components/lists/item-list";
import TicketCard from "@/components/cards/ticket-card";
import DialogModal from "@/components/modals/dialog-modal";
import Link from "next/link";
import { useState } from "react";
import PaymentModal from "@/components/modals/payment-modal";
import { useEventDetails } from "@/hooks/use-event-details";
import { formatEventDate } from "@/utils/date-formatter";

export default function EventPage() {
  const { id } = useParams();
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentDialogModal, setPaymentDialogModal] = useState(false);

  const {
    event: eventData,
    loading: eventLoading,
    error: eventError,
  } = useEventDetails(id);

  const eventInfos = [
    {
      icon: Calendar,
      value: formatEventDate(eventData?.date, {
        fallback: "samedi 24 juin 2025 • 15h30",
      }),
    },
    { icon: HomeAltSlim, value: eventData?.placeName },
    {
      icon: Group,
      value: `${eventData?.maxCustomers} personnes`,
      type: "users",
    },
  ];

  const placeInfos = [
    { icon: MapPin, value: eventData?.cityName },
    { icon: HomeAltSlim, value: eventData?.placeName },
  ];

  return (
    <>
      <main>
        <section className="event-grid">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              {eventLoading ? (
                <h1 className="skeleton-bg">Nom de l'événement</h1>
              ) : (
                <h1>{eventData?.name}</h1>
              )}
              {eventLoading ? (
                <p className="skeleton-bg">Organisé par quelqu'un</p>
              ) : (
                <p>
                  Organisé par{" "}
                  <span className="dark-text">
                    {eventData?.organizer?.pseudo || "Organisateur inconnu"}
                  </span>
                </p>
              )}
            </div>
            {eventLoading ? <></> : <ItemList items={eventInfos} />}
            <div className="flex flex-wrap gap-4 items-center justify-between">
              <button className="primary-btn">
                <span>S'inscrire à l'événement</span>
              </button>
              <button className="blue-rounded-btn">
                <span>Enregistrer l'événement</span>
                <Bookmark />
              </button>
            </div>
          </div>
          {eventLoading ? (
            <div className="banner skeleton-bg"></div>
          ) : (
            <Image
              src={eventData?.imageUrl || niceImage}
              alt="Event image"
              width={800}
              height={450}
              className="banner"
            />
          )}
        </section>
        <section className="page-grid">
          <div className="flex flex-col gap-12 lg:col-span-2">
            <div className="flex flex-col gap-6">
              <h2>Description de l'événement</h2>
              {eventLoading ? (
                <>
                  <p className="skeleton-bg">
                    Description complète de l'événement
                  </p>
                </>
              ) : (
                <>
                  <p>{eventData?.description}</p>
                </>
              )}
            </div>
            <div className="flex flex-col gap-6">
              <h2>Tags</h2>
              {eventLoading ? (
                <>
                  <div className="flex flex-wrap gap-2 w-full">
                    <button className="skeleton-btn">Catégorie</button>
                    <button className="skeleton-btn">Catégorie</button>
                  </div>
                </>
              ) : (
                <ThemeTags theme={eventData.categories} />
              )}
            </div>
            <div className="flex flex-col gap-6">
              <h2>Lieu</h2>
              {eventLoading ? <></> : <ItemList items={placeInfos} />}
            </div>
            {!eventLoading && (
              <ProfilCard
                profilId={eventData?.organizer?.id}
                className="relative translate-y-0"
                name={`${eventData?.organizer?.firstName} ${eventData?.organizer?.lastName}`}
                pseudo={eventData?.organizer?.pseudo}
                note={eventData?.organizer?.note}
                role="Organizer"
                imageUrl={eventData?.organizer?.imageUrl}
              />
            )}
          </div>
          <div>
            <div className="flex flex-col gap-6 sticky top-20">
              <h2>Billet</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                <TicketCard
                  title="Billet Eco+"
                  description="Billet pour les rats+, tu vas finir debout"
                  price={43}
                  onClick={() => setPaymentModal(true)}
                />
              </div>
            </div>
          </div>
        </section>
      </main>
      <PaymentModal
        isOpen={paymentModal}
        setIsOpen={() => setPaymentModal(false)}
        onClick={() => setPaymentDialogModal(true)}
        ticket="Billet Eco+"
        price={43}
      />
      <DialogModal
        title="Achat effectué"
        isOpen={paymentDialogModal}
        setIsOpen={() => setPaymentDialogModal(false)}
        icon={Check}
        description={
          <>
            L'achat de votre billet pour l'événement{" "}
            <span className="dark-text">Atelier fresque végétal</span> a bien
            été effectué. <br /> Retrouver votre billet dans la rubrique{" "}
            <Link
              href="/account/profil/participations"
              className="blue-text underline"
            >
              Mes inscriptions
            </Link>
            .
          </>
        }
      />
    </>
  );
}
