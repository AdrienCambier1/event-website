import CustomTitle from "@/components/titles/custom-title";
import OrderedTicketCard from "../cards/odered-ticket-card/ordered-ticket-card";
import OrderedTicketCardSkeleton from "../cards/odered-ticket-card/ordered-ticket-card-skeleton";

export default function TicketList({ title, description, isLoading, tickets }) {
  return (
    <section className="page-grid">
      <div className="flex flex-col gap-6">
        <CustomTitle title={title} description={description} />
        <div className="flex flex-col gap-4">
          <p>
            Retrouvez la liste complète des tickets que vous avez commandés.
          </p>
        </div>
      </div>
      <div className="cards-grid">
        {isLoading && (
          <>
            <OrderedTicketCardSkeleton />
            <OrderedTicketCardSkeleton />
            <OrderedTicketCardSkeleton />
            <OrderedTicketCardSkeleton />
          </>
        )}
        {!isLoading &&
          tickets?.map((ticket) => (
            <OrderedTicketCard
              key={ticket.id}
              id={ticket.id}
              name={ticket.name}
              price={ticket.price}
              date={ticket.date}
              time={ticket.time}
              location={ticket.location}
              city={ticket.city}
            />
          ))}
        {!isLoading && tickets?.length === 0 && (
          <p>Aucun ticket disponible pour le moment</p>
        )}
      </div>
    </section>
  );
}
