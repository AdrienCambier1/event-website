"use client";
import TicketList from "@/components/lists/ticket-list";
import { useCurrentUserOrdersWithEvents } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { formatDateOnly, formatEventDate } from "@/utils/date-formatter";
import { useParametres } from "@/contexts/parametres-context";

export default function TicketsPage() {
  const { token } = useAuth();
  const { orders, loading: ordersLoading } =
    useCurrentUserOrdersWithEvents(token);
  const { isLoading: parentLoading } = useParametres();

  const isLoading = ordersLoading || parentLoading;

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

  return (
    <TicketList
      title="Mes tickets disponibles"
      description="Tickets"
      isLoading={isLoading}
      tickets={tickets}
    />
  );
}
