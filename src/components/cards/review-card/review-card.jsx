"use client";
import profilPicture from "@/assets/images/profil-pic.jpg";
import Image from "next/image";
import RatingStar from "../../commons/rating-stars";
import { BadgeCheck, Bin, MoreHoriz } from "iconoir-react";
import { formatDateOnly } from "@/utils/date-formatter";
import { useState, useEffect, useRef } from "react";
import DialogModal from "../../modals/dialog-modal";
import { useDeleteReview } from "@/hooks/use-review";
import { useAuth } from "@/hooks/use-auth";

export default function ReviewCard({
  name,
  note,
  date,
  review,
  canEdit = false,
  reviewData,
  onRefresh,
}) {
  const [editDropdown, setEditDropdown] = useState(false);
  const [deleteModal, setDeleteModal] = useState(false);
  const editDropdownRef = useRef(null);
  const { token } = useAuth();
  const { removeReview, loading } = useDeleteReview(token);

  const handleDelete = async () => {
    if (reviewData?.reviewId) {
      const success = await removeReview(reviewData.reviewId);
      if (success) {
        setDeleteModal(false);

        if (onRefresh) {
          await onRefresh();
        }
      }
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        editDropdownRef.current &&
        !editDropdownRef.current.contains(event.target) &&
        editDropdown
      ) {
        setEditDropdown(false);
      }
    };

    if (editDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [editDropdown]);

  return (
    <>
      <div className="white-card p-4 flex gap-4 h-fit">
        <Image
          src={profilPicture}
          alt="Profil picture"
          className="profil-pic-xl"
        />
        <div className="flex flex-col gap-4 w-full">
          <h3 className="text-[var(--secondary-blue)]">{name}</h3>
          <div className="flex flex-col">
            <p className="dark-text">Note attribuée</p>
            <RatingStar note={note} />
          </div>
          <p className="blue-text">{formatDateOnly(date)}</p>
          <p>{review}</p>
          <div className="flex justify-between items-center">
            <div className="green-tag">
              <BadgeCheck />
              <span>Avis certifié</span>
            </div>
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
                  <button
                    className="dropdown-dangerous"
                    onClick={() => {
                      setDeleteModal(true);
                      setEditDropdown(false);
                    }}
                  >
                    <span>Supprimer l'avis</span>
                    <Bin />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <DialogModal
        icon={Bin}
        isOpen={deleteModal}
        setIsOpen={() => setDeleteModal(false)}
        title="Supprimer votre avis"
        description="Êtes-vous sûr de vouloir supprimer cet avis ? Cette action est irréversible."
        action={loading ? "Suppression..." : "Supprimer"}
        onClick={handleDelete}
        isDangerous={true}
      />
    </>
  );
}
