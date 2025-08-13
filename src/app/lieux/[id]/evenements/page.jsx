"use client";
import EventList from "@/components/lists/event-list";
import { useParams } from "next/navigation";
import { usePlaceEvents } from "@/hooks/use-place";

export default function EventsPage() {
  const { id } = useParams();

  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = usePlaceEvents(id, 50);

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
