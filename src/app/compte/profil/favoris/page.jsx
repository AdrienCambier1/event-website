"use client";
import { useAuth } from "@/hooks/use-auth";
import { useEvents } from "@/hooks/use-event";
import EventList from "@/components/lists/event-list";
import { useParametres } from "@/contexts/parametres-context";
import { useFavorites } from "@/contexts/favorites-context";

export default function FavorisPage() {
  const { user, token, isAuthenticated } = useAuth();
  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents(token, 0, 100);
  const { isLoading: parentLoading } = useParametres();
  const { favorites } = useFavorites();

  const isLoading = eventsLoading || parentLoading;

  const favoriteEvents = Array.isArray(events)
    ? events.filter((event) => favorites.includes(event.id))
    : [];

  return (
    <EventList
      title="Mes événements favoris"
      description="Evenements"
      showSort={true}
      showFilters={true}
      events={favoriteEvents}
      isLoading={isLoading}
    />
  );
}
