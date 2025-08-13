"use client";
import EventList from "@/components/lists/event-list";
import { useParams } from "next/navigation";
import { useCityEvents } from "@/hooks/use-city";

export default function EvenementsPage() {
  const { id } = useParams();

  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useCityEvents(id, 0, 50);

  return (
    <EventList
      title="Rechercher un événement"
      description="Événements"
      showSort={true}
      showFilters={true}
      events={events}
      isLoading={eventsLoading}
    />
  );
}
