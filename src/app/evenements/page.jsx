"use client";
import MainTitle from "@/components/titles/main-title";
import { useEvents } from "@/hooks/use-event";
import EventList from "@/components/lists/event-list";

export default function EventsPage() {
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents(0, 100);

  return (
    <main>
      <section className="container items-center">
        <MainTitle title="Tous nos événements" />
        <p className="text-center">
          Découvrez tous les événements actuellement organisés.
        </p>
      </section>
      <EventList
        title="Rechercher un événement"
        description="Evenements"
        showSort={true}
        showFilters={true}
        events={events}
        isLoading={eventsLoading}
      />
    </main>
  );
}
