"use client";
import { useAuth } from "@/hooks/use-auth";
import { useUserEvents } from "@/hooks/use-user-events";
import EventList from "@/components/lists/event-list";

export default function EvenementsPage() {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const {
    events,
    loading: eventsLoading,
    error,
  } = useUserEvents(isAuthenticated ? user?.id : null, token);

  const isLoading = authLoading || eventsLoading;

  const shouldShowSkeleton =
    isLoading || (isAuthenticated && !events && !error);

  return (
    <EventList
      title="Événements"
      description="Événements organisés"
      showCreateButton={true}
      canEdit={true}
      events={events?._embedded?.eventSummaryResponses || []}
      isLoading={shouldShowSkeleton}
    />
  );
}
