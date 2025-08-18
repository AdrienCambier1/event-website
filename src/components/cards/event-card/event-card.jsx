"use client";
import { Bookmark, MoreHoriz, UserXmark } from "iconoir-react";
import profilPicture from "@/assets/images/profil-pic.jpg";
import RatingStar from "../../commons/rating-stars";
import ThemeTags from "../../commons/theme-tags";
import Image from "next/image";
import niceImage from "@/assets/images/nice.jpg";
import ProfilImages from "../../commons/profil-images/profil-images";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import DialogModal from "../../modals/dialog-modal";
import { formatEventDate } from "@/utils/date-formatter";

export default function EventCard({
  eventId,
  canEdit,
  isRegistered,
  isTrending,
  date,
  description,
  name,
  organizerName,
  organizerImageUrl,
  organizerNote,
  imageUrl,
  cityName,
  categories,
}) {
  const [editDropdown, setEditDropdown] = useState(false);
  const [registeredDropdown, setRegisteredDropdown] = useState(false);
  const [unsubscribeModal, setUnsubscribeModal] = useState(false);
  const editDropdownRef = useRef(null);
  const registeredDropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editDropdownRef.current &&
        !editDropdownRef.current.contains(event.target) &&
        editDropdown
      ) {
        setEditDropdown(false);
      }

      if (
        registeredDropdownRef.current &&
        !registeredDropdownRef.current.contains(event.target) &&
        registeredDropdown
      ) {
        setRegisteredDropdown(false);
      }
    };

    if (editDropdown || registeredDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editDropdown, registeredDropdown]);

  const eventCardContent = () => {
    return (
      <>
        <div className="relative">
          <Image
            src={imageUrl || niceImage}
            alt="Event image"
            width={400}
            height={225}
            className="object-cover rounded-t-xl aspect-[16/9]"
          />
          {isTrending && <div className="trending-tag">Tendance</div>}
        </div>
        <div className="flex flex-col gap-4 p-4 justify-between flex-1">
          <div className="flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <h3 className="text-[var(--secondary-blue)]">{name}</h3>
              <Bookmark className="text-[var(--primary-blue)] h-6 w-6 flex-shrink-0" />
            </div>
            <div className="flex items-center gap-4">
              <Image
                src={organizerImageUrl || profilPicture}
                alt="Profil picture"
                width={48}
                height={48}
                className="profil-pic-md"
              />
              <div className="flex flex-col">
                <p className="dark-text">{organizerName}</p>
                <RatingStar note={organizerNote} />
              </div>
            </div>
            <p className="blue-text">
              {cityName} |{" "}
              {formatEventDate(date, {
                fallback: "samedi 24 juin 2025 • 15h30",
              })}
            </p>
            <ThemeTags
              themes={
                categories?.map((cat) => cat.name) || ["Musique", "Sponsorisé"]
              }
            />
            <p className="line-clamp-3">{description}</p>
          </div>
          <div className="flex justify-between items-center">
            <ProfilImages totalCount={8} />
            {canEdit && (
              <div className="relative" ref={editDropdownRef}>
                <button
                  className="more-btn"
                  onClick={() => setEditDropdown(!editDropdown)}
                >
                  <MoreHoriz />
                </button>
                <div
                  className={`${
                    editDropdown ? "visible opacity-100" : "invisible opacity-0"
                  } dropdown-parent right-0`}
                >
                  <Link
                    href={`/evenements/${eventId}`}
                    className="dropdown-child"
                    onClick={() => setEditDropdown(false)}
                  >
                    Voir l'événement
                  </Link>
                  <Link
                    href="https://veevent-admin.vercel.app/"
                    className="dropdown-child"
                    onClick={() => setEditDropdown(false)}
                    target="_blank"
                  >
                    Paramétrer l'événement
                  </Link>
                </div>
              </div>
            )}
            {isRegistered && (
              <div className="relative" ref={registeredDropdownRef}>
                <button
                  className="more-btn"
                  onClick={() => setRegisteredDropdown(!registeredDropdown)}
                >
                  <MoreHoriz />
                </button>
                <div
                  className={`${
                    registeredDropdown
                      ? "visible opacity-100"
                      : "invisible opacity-0"
                  } dropdown-parent right-0`}
                >
                  <Link
                    href={`/evenements/${eventId}`}
                    className="dropdown-child"
                    onClick={() => setRegisteredDropdown(false)}
                  >
                    Voir l'événement
                  </Link>
                  <Link
                    href="/compte/profil/tickets"
                    className="dropdown-child"
                    onClick={() => setRegisteredDropdown(false)}
                  >
                    Consulter le billet
                  </Link>
                  <button
                    className="dropdown-dangerous"
                    onClick={() => {
                      setRegisteredDropdown(false);
                      setUnsubscribeModal(true);
                    }}
                  >
                    <span>Se désincrire</span>
                    <UserXmark />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </>
    );
  };

  return (
    <>
      {canEdit || isRegistered ? (
        <div className="white-card flex flex-col h-full">
          {eventCardContent()}
        </div>
      ) : (
        <Link
          href={`/evenements/${eventId}`}
          className="white-card flex flex-col h-full"
        >
          {eventCardContent()}
        </Link>
      )}
      <DialogModal
        icon={UserXmark}
        isOpen={unsubscribeModal}
        setIsOpen={() => setUnsubscribeModal(false)}
        title="Se désinscrire de l'événement"
        action="Se désinscrire"
        description={
          <>
            Souhaitez vous vraiment annuler votre inscription à l'événement{" "}
            <span className="dark-text">Atelier fresque végétal</span>, votre
            inscription sera remboursée.
          </>
        }
        onClick={() => setUnsubscribeModal(false)}
        isDangerous={true}
      />
    </>
  );
}
