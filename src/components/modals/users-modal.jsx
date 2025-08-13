"use client";
import ReactFocusLock from "react-focus-lock";
import ModalBg from "./modal-bg";
import ReactDOM from "react-dom";
import { useState, useEffect, useRef } from "react";
import { Group } from "iconoir-react";
import UserElement from "../commons/user-element/user-element";
import { useEventParticipants } from "@/hooks/use-event";
import { useAuth } from "@/hooks/use-auth";
import UserElementSkeleton from "../commons/user-element/user-element-skeleton";

export default function UsersModal({ isOpen, setIsOpen, eventId = null }) {
  const { token } = useAuth();
  const [mounted, setMounted] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const scrollContainerRef = useRef(null);

  const {
    participants,
    loading: participantsLoading,
    error: participantsError,
  } = useEventParticipants(eventId, token, isOpen);

  const displayUsers =
    participants.length > 0
      ? participants.map((p) => ({
          name: p.firstName + " " + p.lastName,
          id: `@${p.pseudo}`,
          imageUrl: p.imageUrl,
        }))
      : [];

  const checkScrollPosition = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    setIsAtTop(container.scrollTop <= 0);

    const isBottom =
      Math.ceil(container.scrollTop + container.clientHeight) >=
      container.scrollHeight;
    setIsAtBottom(isBottom);
  };

  useEffect(() => {
    setMounted(true);

    if (isOpen) {
      checkScrollPosition();
    }
  }, [isOpen, checkScrollPosition]);

  if (!mounted) return null;

  const scrollContainerProps = {
    ref: scrollContainerRef,
    onScroll: checkScrollPosition,
    className: `overflow-card flex flex-col gap-2 ${
      !isAtTop && !isAtBottom
        ? "mask-both"
        : !isAtTop
        ? "mask-top"
        : !isAtBottom
        ? "mask-bottom"
        : ""
    }`,
  };

  return ReactDOM.createPortal(
    <>
      <ReactFocusLock
        className={`${isOpen ? "visible" : "invisible"} modal-container`}
      >
        <div
          className={`${isOpen ? "opacity-100" : "opacity-0"} modal-content`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="img-gradient-blue">
              <Group />
            </div>
            <h3 className="text-center">Participants</h3>
          </div>
          {!participantsLoading ? (
            <div {...scrollContainerProps}>
              <UserElementSkeleton />
              <UserElementSkeleton />
            </div>
          ) : participants.length === 0 || participantsError ? (
            <p>Aucun participant pour le moment.</p>
          ) : displayUsers.length > 0 ? (
            <div {...scrollContainerProps}>
              {displayUsers.map((user, index) => (
                <UserElement
                  name={user.name}
                  key={index}
                  id={user.id}
                  imageUrl={user.imageUrl}
                />
              ))}
            </div>
          ) : (
            <p>Aucun participant pour le moment</p>
          )}
          <button className="primary-form-btn" onClick={setIsOpen}>
            <span>Fermer</span>
          </button>
        </div>
      </ReactFocusLock>
      <ModalBg className="!z-40" isOpen={isOpen} setIsOpen={setIsOpen} />
    </>,
    document.querySelector("body")
  );
}
