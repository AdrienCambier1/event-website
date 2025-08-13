"use client";
import EventList from "@/components/lists/event-list";
import { useParams } from "next/navigation";
import { useUserEvents } from "@/hooks/use-user-events";

export default function EvenementsPage() {
  const { id } = useParams();

  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useUserEvents(id, null, 0, 50);

  return (
    <EventList
      title="Ses événements organisés"
      description="Événements"
      showSort={true}
      showFilters={true}
      events={events}
      isLoading={eventsLoading}
    />
  );
}
