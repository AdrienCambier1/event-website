import Link from "next/link";
import Image from "next/image";
import niceImage from "@/assets/images/nice.jpg";
import { ArrowUpRightCircleSolid } from "iconoir-react";

export default function CityCard({ cityId, name, eventsCount, bannerUrl }) {
  return (
    <Link href={`/villes/${cityId}/evenements`} className="city-card group">
      <Image
        src={bannerUrl || niceImage}
        alt="City image"
        fill
        className="object-cover"
      />

      <div className="p-4 h-full w-full flex flex-col gap-24 justify-between z-10">
        <div className="flex justify-between items-center">
          <p>{eventsCount} événements</p>
          <p className="!font-extrabold">{name}</p>
        </div>

        <div className="flex items-end gap-8">
          <p className="!text-lg flex-1 text-start">
            Découvrez les événements de {name}
          </p>
          <ArrowUpRightCircleSolid className="group-hover:-translate-y-1 transition" />
        </div>
      </div>

      <div className="absolute bg-gradient-to-tr from-transparent to-[var(--secondary-blue)] opacity-50 h-full w-full"></div>
      <div className="absolute bg-gradient-to-bl from-transparent to-black opacity-50 h-full w-full"></div>
    </Link>
  );
}
