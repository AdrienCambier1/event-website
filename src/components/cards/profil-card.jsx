import profilPicture from "@/assets/images/profil-pic.jpg";
import RatingStar from "@/components/rating-stars";
import Image from "next/image";
import { UserStar } from "iconoir-react";

export default function ProfilCard({
  name,
  pseudo,
  note,
  className,
  role,
  imageUrl,
}) {
  return (
    <div
      className={`bg-white dark-shadow w-full max-w-[600px] absolute -translate-y-1/2 rounded-full h-fit p-4 flex gap-4 items-center ${className}`}
    >
      <Image
        src={imageUrl || profilPicture}
        alt="Profil picture"
        width={80}
        height={80}
        className="profil-pic-xl"
      />
      <div className="flex flex-col gap-2 overflow-hidden">
        <h2 className="truncate">{name}</h2>
        <div className="flex items-center gap-2">
          {role && (
            <div className="green-tag !hidden sm:!flex">
              <span>{role}</span>
              <UserStar />
            </div>
          )}
          <div className="flex flex-col">
            <p className="blue-text">{pseudo}</p>
            <RatingStar note={note} />
          </div>
        </div>
      </div>
    </div>
  );
}
