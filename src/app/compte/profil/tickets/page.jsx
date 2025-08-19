"use client";
import TicketList from "@/components/lists/ticket-list";
import { useCurrentUserOrdersWithEvents } from "@/hooks/use-user";
import { useAuth } from "@/hooks/use-auth";
import { formatDateOnly, formatTimeOnly } from "@/utils/date-formatter";
import { useParametres } from "@/contexts/parametres-context";

export default function TicketsPage() {
  const { token } = useAuth();
  const { orders, loading: ordersLoading } =
    useCurrentUserOrdersWithEvents(token);
  const { isLoading: parentLoading } = useParametres();

  const isLoading = ordersLoading || parentLoading;

  const tickets = Array.isArray(orders)
    ? orders.flatMap(({ order, event }) =>
        (order.tickets || []).map((ticket) => ({
          eventId: event?.id,
          orderId: order.id,
          ticketId: ticket.id,
          name: event?.name,
          price: event?.price,
          date: formatDateOnly(event?.date),
          time: formatTimeOnly(event?.date),
          location: event?.placeName,
          city: event?.cityName,
        }))
      )
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
