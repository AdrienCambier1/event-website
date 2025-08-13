"use client";
import { useAuth } from "@/hooks/use-auth";
import { useUserParticipatingEvents } from "@/hooks/use-user-events";
import EventList from "@/components/lists/event-list";

export default function ParticipationsPage() {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const {
    events: participatingEvents,
    loading: eventsLoading,
    error,
  } = useUserParticipatingEvents(isAuthenticated ? user?.id : null, token);

  const isLoading = authLoading || eventsLoading;

  const shouldShowSkeleton =
    isLoading || (isAuthenticated && !participatingEvents && !error);

  return (
    <EventList
      title="Mes événements participés"
      description="Evenements"
      showCreateButton={true}
      events={participatingEvents?._embedded?.eventSummaryResponses || []}
      isLoading={shouldShowSkeleton}
      isRegistered={true}
    />
  );
}
