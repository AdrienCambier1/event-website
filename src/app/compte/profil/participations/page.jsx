"use client";
import { useAuth } from "@/hooks/use-auth";
import { useUserParticipatingEvents } from "@/hooks/use-user";
import EventList from "@/components/lists/event-list";
import { useParametres } from "@/contexts/parametres-context";

export default function ParticipationsPage() {
  const { user, token, isAuthenticated } = useAuth();
  const {
    events: participatingEvents,
    loading: eventsLoading,
    error,
  } = useUserParticipatingEvents(isAuthenticated ? user?.id : null, token);
  const { isLoading: parentLoading } = useParametres();

  const isLoading = eventsLoading || parentLoading;

  return (
    <EventList
      title="Mes événements participés"
      description="Evenements"
      showCreateButton={true}
      events={participatingEvents}
      isLoading={isLoading}
      isRegistered={true}
    />
  );
}
