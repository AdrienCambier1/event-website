import Barcode from "@/components/commons/barcode";

export default function OrderedTicketCard({
  id,
  name,
  price,
  date,
  time,
  location,
  city,
}) {
  return (
    <div className="white-card p-4 flex flex-col gap-6 justify-between">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-4">
          <h3>{name}</h3>
          <div className="blue-tag">
            <span>{price}€</span>
          </div>
        </div>
        <div className="border-b-2 border-dashed"></div>
        <div className="grid grid-cols-2 justify-between gap-4">
          <div>
            <p>Date</p>
            <p className="dark-text">{date}</p>
          </div>
          <div>
            <p>Heure</p>
            <p className="dark-text">{time}</p>
          </div>
          <div>
            <p>Lieu</p>
            <p className="dark-text">{location}</p>
          </div>
          <div>
            <p>Ville</p>
            <p className="dark-text">{city}</p>
          </div>
        </div>
        <div className="border-b-2 border-dashed"></div>
        <div className="flex justify-center">
          <Barcode
            value={`TICKET-${date}-${id}-VEEVENT`}
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
