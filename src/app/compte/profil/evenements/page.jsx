"use client";
import { useAuth } from "@/hooks/use-auth";
import { useUserEvents } from "@/hooks/use-user";
import EventList from "@/components/lists/event-list";
import { useParametres } from "@/contexts/parametres-context";

export default function EvenementsPage() {
  const { user, token, isAuthenticated } = useAuth();
  const {
    events,
    loading: eventsLoading,
    error,
  } = useUserEvents(isAuthenticated ? user?.id : null, token);
  const { isLoading: parentLoading } = useParametres();

  const isLoading = eventsLoading || parentLoading;

  return (
    <EventList
      title="Mes événements organisés"
      description="Événements"
      showCreateButton={true}
      canEdit={true}
      events={events}
      isLoading={isLoading}
    />
  );
}
