"use client";
import SearchBarButton from "@/components/buttons/search-bar-button";
import CustomTitle from "@/components/titles/custom-title";
import CityCard from "@/components/cards/city-card";
import { NavArrowRight } from "iconoir-react";
import ThemeCard from "@/components/cards/theme-card";
import EventCard from "@/components/cards/event-card";
import MainTitle from "@/components/titles/main-title";
import Link from "next/link";
import SearchBarModal from "@/components/modals/search-bar-modal";
import { useState } from "react";
import { useCities } from "@/hooks/use-cities";
import { useEvents } from "@/hooks/use-events";
import { useAuth } from "@/hooks/use-auth";
import { useCategories } from "@/hooks/use-categories";
import CityCardSkeleton from "@/components/cards/city-card-skeleton";
import EventCardSkeleton from "@/components/cards/event-card-skeleton";
import ThemeCardSkeleton from "@/components/cards/theme-card-skeleton";

export default function Home() {
  const [isSearchBarOpen, setIsSearchBarOpen] = useState(false);

  const { token } = useAuth();

  const {
    data: citiesData,
    loading: citiesLoading,
    error: citiesError,
  } = useCities(0, 3);

  const {
    data: eventsData,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents(token, 0, 3);

  const {
    categories,
    isLoading: categoriesLoading,
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
          <SearchBarButton
            onClick={() => setIsSearchBarOpen(!isSearchBarOpen)}
          />
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
            {!citiesLoading &&
              citiesData?._embedded?.cityResponses?.length === 0 && (
                <div className="col-span-full">
                  <p className="text-center">
                    Aucune ville disponible pour le moment
                  </p>
                </div>
              )}
            {!citiesLoading &&
              citiesData?._embedded?.cityResponses?.map((city) => (
                <CityCard
                  key={city.id}
                  name={city.name}
                  eventsCount={city.eventsCount || 0}
                  bannerUrl={city.bannerUrl}
                  /* changeCity={() => changeCity(city.name)} */
                />
              ))}
          </div>
          <Link href="/cities" className="blue-rounded-btn">
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
              <>
                <ThemeCard theme="sport" />
                <ThemeCard theme="musique" />
                <ThemeCard theme="learning" />
                <ThemeCard />
              </>
            )}
          </div>
        </section>
        <section className="container">
          <CustomTitle title="Recommandé pour vous" description="Evenements" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsLoading && (
              <>
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </>
            )}
            {!eventsLoading &&
              eventsData?._embedded?.eventSummaryResponses?.length === 0 && (
                <div className="col-span-full">
                  <p className="text-center">
                    Aucun événement disponible pour le moment
                  </p>
                </div>
              )}
            {!eventsLoading &&
              eventsData?._embedded?.eventSummaryResponses?.map((event) => (
                <EventCard
                  key={event.id}
                  date={event.date}
                  description={event.description}
                  name={event.name}
                  organizerName={event.organizer?.pseudo}
                  organizerImageUrl={event.organizer?.imageUrl}
                  organizerNote={event.organizer?.note}
                  imageUrl={event.imageUrl}
                  cityName={event.cityName}
                  isTrending={event.isTrending}
                  categories={event.categories}
                />
              ))}
          </div>
          <Link href="/subscriptions/events" className="blue-rounded-btn">
            <span>Voir plus</span>
            <NavArrowRight />
          </Link>
        </section>
        <section className="container">
          <CustomTitle title="Proche de chez vous" description="Evenements" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {eventsLoading && (
              <>
                <EventCardSkeleton />
                <EventCardSkeleton />
                <EventCardSkeleton />
              </>
            )}
            {!eventsLoading &&
              eventsData?._embedded?.eventSummaryResponses?.length === 0 && (
                <div className="col-span-full">
                  <p className="text-center">
                    Aucun événement disponible pour le moment
                  </p>
                </div>
              )}
            {!eventsLoading &&
              eventsData?._embedded?.eventSummaryResponses?.map((event) => (
                <EventCard
                  key={event.id}
                  date={event.date}
                  description={event.description}
                  name={event.name}
                  organizerName={event.organizer?.pseudo}
                  organizerImageUrl={event.organizer?.imageUrl}
                  organizerNote={event.organizer?.note}
                  imageUrl={event.imageUrl}
                  cityName={event.cityName}
                  isTrending={event.isTrending}
                  categories={event.categories}
                />
              ))}
          </div>
          <Link href="/activities/events" className="blue-rounded-btn">
            <span>Voir plus</span>
            <NavArrowRight />
          </Link>
        </section>
      </main>
      <SearchBarModal
        isOpen={isSearchBarOpen}
        setIsOpen={() => setIsSearchBarOpen(!isSearchBarOpen)}
      />
    </>
  );
}
