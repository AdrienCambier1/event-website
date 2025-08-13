import profilPicture from "@/assets/images/profil-pic.jpg";
import Image from "next/image";
import RatingStar from "../../commons/rating-stars";
import Link from "next/link";
import { NavArrowRight } from "iconoir-react";

export default function OrganizerCard({
  organizerId,
  name,
  pseudo,
  note,
  eventPastCount,
  eventsCount,
  imageUrl,
}) {
  return (
    <div className="white-card p-4 flex gap-4">
      <Image
        src={imageUrl || profilPicture}
        alt="Profil picture"
        width={80}
        height={80}
        className="profil-pic-xl"
      />
      <div className="flex flex-col gap-4 justify-between w-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-[var(--secondary-blue)]">{name}</h3>
          <div className="flex flex-col">
            <p className="blue-text">{pseudo}</p>
            <RatingStar note={note} />
          </div>
          <p>
            {eventPastCount} événements passés | {eventsCount} événements en
            cours
          </p>
        </div>
        <div className="w-full flex justify-end">
          <Link
            href={`/organisateurs/${organizerId}/evenements`}
            className="secondary-btn"
          >
            <span>Voir le profil</span>
            <NavArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
