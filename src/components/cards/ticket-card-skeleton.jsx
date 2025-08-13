import { Plus } from "iconoir-react";

export default function TicketCardSkeleton() {
  return (
    <div className="ticket-card skeleton-bg">
      <div className="p-6 flex flex-col gap-6 justify-between">
        <div className="flex flex-col gap-4">
          <h3>Nom de l'événement</h3>
          <p>Organisé par quelqu'un</p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-xl font-bold">00 €</p>
          <button className="primary-btn">
            <span>Réserver</span>
            <Plus />
          </button>
        </div>
      </div>
    </div>
  );
}
