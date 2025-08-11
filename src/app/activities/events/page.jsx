"use client";
import EventList from "@/components/lists/event-list";
import { useAuth } from "@/hooks/use-auth";
import { useEvents } from "@/hooks/use-events";

export default function EventsPage() {
  const { token } = useAuth();

  const {
    data: eventsData,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents(token, 0, 3);

  return (
    <EventList
      title="Rechercher un événement"
      description="Evenements"
      showSort={true}
      showFilters={true}
      events={eventsData?._embedded?.eventSummaryResponses || []}
      isLoading={eventsLoading}
    />
  );
}
