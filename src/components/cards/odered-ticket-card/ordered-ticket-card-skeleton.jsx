import Barcode from "@/components/commons/barcode";

export default function OrderedTicketCardSkeleton() {
  return (
    <div className="white-card p-4 flex flex-col gap-6 justify-between skeleton-bg">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h3>Nom de l'événement</h3>
          <div className="blue-tag">
            <span>00€</span>
          </div>
        </div>
        <div className="border-b-2 border-dashed"></div>
        <div className="grid grid-cols-2 justify-between gap-4">
          <div>
            <p>Date</p>
            <p className="dark-text">Une date</p>
          </div>
          <div>
            <p>Heure</p>
            <p className="dark-text">Une heure</p>
          </div>
          <div>
            <p>Lieu</p>
            <p className="dark-text">Un lieu</p>
          </div>
          <div>
            <p>Ville</p>
            <p className="dark-text">Une ville</p>
          </div>
        </div>
        <div className="border-b-2 border-dashed"></div>
        <div className="flex justify-center">
          <Barcode
            value="TICKET-0000-0-VEEVENT"
            width={250}
            height={60}
            showText={true}
          />
        </div>
      </div>
      <button className="primary-form-btn">
        <span>Voir le code QR</span>
      </button>
    </div>
  );
}
