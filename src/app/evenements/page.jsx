"use client";

import MainTitle from "@/components/titles/main-title";
import { useEvents } from "@/hooks/use-event";
import EventList from "@/components/lists/event-list";
import { useEffect, useState } from "react";

export default function EventsPage() {
  const [initialTheme, setInitialTheme] = useState(null);

  const {
    events,
    loading: eventsLoading,
    error: eventsError,
  } = useEvents(0, 50);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      setInitialTheme(params.get("theme"));
    }
  }, []);

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
        events={events}
        isLoading={eventsLoading}
        initialTheme={initialTheme}
      />
    </main>
  );
}
