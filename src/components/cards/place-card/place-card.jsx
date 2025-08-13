import Image from "next/image";
import niceImage from "@/assets/images/nice.jpg";
import Link from "next/link";
import { NavArrowRight, ShopFourTilesWindow } from "iconoir-react";

export default function PlaceCard({
  placeId,
  address,
  name,
  eventsCount,
  imageUrl,
  cityName,
  placeType,
}) {
  return (
    <div className="white-card p-4 flex gap-4">
      <Image
        src={imageUrl || niceImage}
        alt="Event image"
        width={80}
        height={80}
        className="profil-pic-xl"
      />
      <div className="flex flex-col gap-4 justify-between w-full">
        <div className="flex flex-col gap-4">
          <h3 className="text-[var(--secondary-blue)]">{name}</h3>
          <p className="blue-text">
            {cityName} | {address}
          </p>
          <div className="green-tag">
            <ShopFourTilesWindow />
            <span>{placeType}</span>
          </div>
          <p className="line-clamp-2">{eventsCount} événements actifs</p>
        </div>
        <div className="w-full flex justify-end">
          <Link href={`/lieux/${placeId}/evenements`} className="secondary-btn">
            <span>Voir le lieux</span>
            <NavArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}
