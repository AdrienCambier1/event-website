"use client";
import CustomTitle from "@/components/titles/custom-title";
import CityCard from "@/components/cards/city-card/city-card";
import { NavArrowRight } from "iconoir-react";
import ThemeCard from "@/components/cards/theme-card/theme-card";
import EventCard from "@/components/cards/event-card/event-card";
import MainTitle from "@/components/titles/main-title";
import Link from "next/link";
import { useCities } from "@/hooks/use-city";
import { useEvents } from "@/hooks/use-event";
import { useAuth } from "@/hooks/use-auth";
import { useCategories } from "@/hooks/use-category";
import CityCardSkeleton from "@/components/cards/city-card/city-card-skeleton";
import EventCardSkeleton from "@/components/cards/event-card/event-card-skeleton";
import ThemeCardSkeleton from "@/components/cards/theme-card/theme-card-skeleton";
import { useSearchModal } from "@/contexts/search-modal-context";
import SearchBarBtn from "@/components/buttons/search-bar-btn";

export default function Home() {
  const { toggleSearchModal } = useSearchModal();

  const { token } = useAuth();

  const {
    cities,
    loading: citiesLoading,
    error: citiesError,
  } = useCities(0, 3);

  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents(token, 0, 3);

  const {
    categories,
    loading: categoriesLoading,
    error: categoriesError,
  } = useCategories();

  return (
    <>
      <main>
        <section className="container items-center">
          <MainTitle title="Découvrez nos événements" />
          <p className="text-center">
            Un concert 🎸qui fait vibrer. Un atelier qui inspire.
            <br /> Un festival 🎪 à ne pas manquer. Tout est ici. Découvrez,
            réservez, profitez. 🗓️
          </p>
          <SearchBarBtn onClick={toggleSearchModal} />
        </section>
        <section className="container">
          <CustomTitle title="Les villes tendances" description="Villes" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {citiesLoading && (
              <>
                <CityCardSkeleton />
                <CityCardSkeleton />
                <CityCardSkeleton />
              </>
            )}
            {!citiesLoading && (cities?.length === 0 || citiesError) && (
              <p>Aucune ville disponible pour le moment</p>
            )}
            {!citiesLoading &&
              cities?.map((city) => (
                <CityCard
                  cityId={city.id}
                  key={city.id}
                  name={city.name}
                  eventsCount={city.eventsCount || 0}
                  bannerUrl={city.bannerUrl}
                />
              ))}
          </div>
          <Link href="/villes" className="blue-rounded-btn">
            <span>Voir plus</span>
            <NavArrowRight />
          </Link>
        </section>
        <section className="container">
          <CustomTitle title="Envie d'une sortie" description="Thèmes" />
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {categoriesLoading && (
              <>
                <ThemeCardSkeleton />
                <ThemeCardSkeleton />
                <ThemeCardSkeleton />
                <ThemeCardSkeleton />
              </>
            )}
            {!categoriesLoading &&
              categories
                .slice(0, 4)
                .map((category) => (
                  <ThemeCard
                    key={category.key}
                    theme={category.key}
                    title={category.name}
                    description={category.description}
                  />
                ))}
            {!categoriesLoading && categories.length === 0 && (
              <p>Aucune catégorie disponible pour le moment</p>
            )}
          </div>
        </section>
        <section className="container">
          <CustomTitle title="Recommandé pour vous" description="Événements" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsLoading && (
              <>
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </>
            )}
            {!eventsLoading && (events?.length === 0 || eventsError) && (
              <p>Aucun événement disponible pour le moment</p>
            )}
            {!eventsLoading &&
              events?.map((event) => (
                <EventCard
                  eventId={event.id}
                  key={event.id}
                  date={event.date}
                  description={event.description}
                  name={event.name}
                  organizerName={event.organizer?.pseudo}
                  organizerImageUrl={event.organizer?.imageUrl}
                  organizerNote={event.organizer?.note}
                  imageUrl={event.imageUrl}
                  currentParticipants={event.currentParticipants}
                  cityName={event.cityName}
                  isTrending={event.isTrending}
                  categories={event.categories}
                />
              ))}
          </div>
          <Link href="/evenements" className="blue-rounded-btn">
            <span>Voir plus</span>
            <NavArrowRight />
          </Link>
        </section>
        <section className="container">
          <CustomTitle title="Proche de chez vous" description="Événements" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsLoading && (
              <>
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </>
            )}
            {!eventsLoading && (events?.length === 0 || eventsError) && (
              <p>Aucun événement disponible pour le moment</p>
            )}
            {!eventsLoading &&
              events?.map((event) => (
                <EventCard
                  eventId={event.id}
                  key={event.id}
                  date={event.date}
                  description={event.description}
                  name={event.name}
                  organizerName={event.organizer?.pseudo}
                  organizerImageUrl={event.organizer?.imageUrl}
                  organizerNote={event.organizer?.note}
                  imageUrl={event.imageUrl}
                  currentParticipants={event.currentParticipants}
                  cityName={event.cityName}
                  isTrending={event.isTrending}
                  categories={event.categories}
                />
              ))}
          </div>
          <Link href="/evenements" className="blue-rounded-btn">
            <span>Voir plus</span>
            <NavArrowRight />
          </Link>
        </section>
      </main>
    </>
  );
}
