"use client";
import MainTitle from "@/components/titles/main-title";
import { useAuth } from "@/hooks/use-auth";
import { useEvents } from "@/hooks/use-events";
import EventList from "@/components/lists/event-list";

export default function EventsPage() {
  const { token } = useAuth();

  const {
    data: eventsData,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents(token, 0, 3);

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
        events={eventsData?._embedded?.eventSummaryResponses || []}
        isLoading={eventsLoading}
      />
    </main>
  );
}
