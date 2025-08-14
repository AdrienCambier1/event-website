"use client";
import TicketList from "@/components/lists/ticket-list";
import { useCurrentUserOrdersWithEvents } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { formatDateOnly, formatEventDate } from "@/utils/date-formatter";

export default function TicketsPage() {
  const { user, token, isAuthenticated, loading: authLoading } = useAuth();
  const { orders, loading, error } = useCurrentUserOrdersWithEvents(token);

  const isLoading = authLoading || loading;

  const tickets = Array.isArray(orders)
    ? orders.map(({ order, event }) => ({
        id: order.id,
        name: event?.name || "-",
        price: event?.price || 0,
        date: formatDateOnly(event?.date),
        time: event?.date
          ? new Date(event.date).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })
          : "-",
        location: event?.placeName || "-",
        city: event?.cityName || "-",
      }))
    : [];

  const shouldShowSkeleton =
    isLoading || (isAuthenticated && !tickets.length && !error);

  return (
    <TicketList
      title="Mes tickets disponibles"
      description="Tickets"
      isLoading={shouldShowSkeleton}
      tickets={tickets}
    />
  );
}
