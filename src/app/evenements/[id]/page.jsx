"use client";
import { notFound, useParams } from "next/navigation";
import Image from "next/image";
import niceImage from "@/assets/images/nice.jpg";
import {
  Bookmark,
  BookmarkSolid,
  Calendar,
  Group,
  HomeAltSlim,
  MapPin,
} from "iconoir-react";
import ThemeTags from "@/components/commons/theme-tags";
import ProfilCard from "@/components/cards/profil-card";
import ItemList from "@/components/lists/item-list";
import TicketCard from "@/components/cards/ticket-card/ticket-card";
import { useEventWithPlaceDetails } from "@/hooks/use-event";
import { formatEventDate } from "@/utils/date-formatter";
import TicketCardSkeleton from "@/components/cards/ticket-card/ticket-card-skeleton";
import { useAuth } from "@/hooks/use-auth";
import ReportBtn from "@/components/buttons/report-btn";
import { useFavorites } from "@/contexts/favorites-context";
import GoogleMap from "@/components/commons/google-map";

export default function EventPage() {
  const { id } = useParams();
  const { isAuthenticated, user, token } = useAuth();
  const { isFavorite, toggleFavorite } = useFavorites();

  const {
    event,
    place,
    loading: eventLoading,
    error: eventError,
  } = useEventWithPlaceDetails(id);

  const eventInfos = [
    {
      icon: Calendar,
      value: formatEventDate(event?.date, {
        fallback: "samedi 24 juin 2025 • 15h30",
      }),
    },
    { icon: HomeAltSlim, value: event?.placeName },
    {
      icon: Group,
      value: `${event?.currentParticipants} personnes`,
      information:
        event && event.currentParticipants < event.maxCustomers
          ? `Limité à ${event.maxCustomers} personnes`
          : null,
      error:
        event && event.currentParticipants >= event.maxCustomers
          ? "Cet événement est complet"
          : null,
      type: "users",
    },
  ];

  const placeInfos = [
    { icon: MapPin, value: event?.cityName },
    { icon: HomeAltSlim, value: event?.placeName },
  ];

  if (eventError) {
    notFound();
  }

  return (
    <>
      <main>
        <section className="event-grid">
          <div className="flex flex-col gap-12">
            <div className="flex flex-col gap-2">
              {eventLoading ? (
                <h1 className="skeleton-bg">Nom de l'événement </h1>
              ) : (
                <h1>{event?.name}</h1>
              )}
              {eventLoading ? (
                <p className="skeleton-bg">Organisé par quelqu'un</p>
              ) : (
                <p>
                  Organisé par{" "}
                  <span className="dark-text">
                    {event?.organizer?.pseudo || "Organisateur inconnu"}
                  </span>
                </p>
              )}
            </div>
            <ItemList
              items={eventInfos}
              eventId={id}
              isLoading={eventLoading}
            />
            <div className="flex flex-wrap gap-4 items-center justify-between">
              {eventLoading ? (
                <>
                  <button className="primary-btn skeleton-bg">
                    <span>Signaler l'événement</span>
                  </button>
                  <button className="blue-rounded-btn skeleton-bg">
                    <span>Enregistrer</span>
                  </button>
                </>
              ) : (
                <>
                  <ReportBtn
                    title={event?.name}
                    userId={user?.id}
                    organizerId={event?.id}
                    isAuthenticated={isAuthenticated}
                    token={token}
                  />
                  {isFavorite(event?.id) ? (
                    <button
                      className="blue-rounded-btn"
                      onClick={() => toggleFavorite(event?.id)}
                    >
                      <span>Retirer des favoris</span>
                      <BookmarkSolid />
                    </button>
                  ) : (
                    <button
                      className="blue-rounded-btn"
                      onClick={() => toggleFavorite(event?.id)}
                    >
                      <span>Ajouter aux favoris</span>
                      <Bookmark />
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
          {eventLoading ? (
            <div className="banner skeleton-bg"></div>
          ) : (
            <Image
              src={event?.imageUrl || niceImage}
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
                  <p>{event?.description}</p>
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
                <ThemeTags themes={event.categories} />
              )}
            </div>
            <div className="flex flex-col gap-6">
              <h2>Lieu</h2>
              <ItemList items={placeInfos} isLoading={eventLoading} />
              {eventLoading ? (
                <div className="google-map-card skeleton-bg"></div>
              ) : (
                <GoogleMap
                  lat={place?.location?.latitude}
                  lng={place?.location?.longitude}
                />
              )}
            </div>
            {!eventLoading && (
              <ProfilCard
                profilId={event?.organizer?.id}
                className="relative translate-y-0"
                name={`${event?.organizer?.firstName} ${event?.organizer?.lastName}`}
                pseudo={event?.organizer?.pseudo}
                note={event?.organizer?.note}
                role="Organizer"
                imageUrl={event?.organizer?.imageUrl}
              />
            )}
          </div>
          <div>
            <div className="flex flex-col gap-6 sticky top-20">
              <h2>Billet</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-6">
                {eventLoading ? (
                  <TicketCardSkeleton />
                ) : (
                  <TicketCard
                    title={event?.name}
                    description={`Cet événement${
                      event?.isInvitationOnly
                        ? " uniquement accessible sur invitation"
                        : " accessible pour tout le monde"
                    } est organisé par ${
                      event?.organizer?.pseudo || "Organisateur inconnu"
                    }`}
                    price={event?.price}
                    eventId={event?.id}
                    isInvitationOnly={event?.isInvitationOnly}
                    organizer={event?.organizer?.pseudo}
                    isAuthenticated={isAuthenticated}
                    user={user}
                    token={token}
                    isDisabled={event.currentParticipants >= event.maxCustomers}
                  />
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
