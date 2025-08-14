import CustomTitle from "@/components/titles/custom-title";
import OrderedTicketCard from "../cards/odered-ticket-card/ordered-ticket-card";
import OrderedTicketCardSkeleton from "../cards/odered-ticket-card/ordered-ticket-card-skeleton";

export default function TicketList({ title, description }) {
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
        <OrderedTicketCardSkeleton />
        <OrderedTicketCard
          id={1}
          name="Event 1"
          price={10}
          date="12/7/2025"
          time="12:00"
          location="Location 1"
          city="City 1"
        />
      </div>
    </section>
  );
}
