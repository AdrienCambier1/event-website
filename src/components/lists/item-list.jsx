"use client";
import { Circle, NavArrowRight, CheckCircleSolid } from "iconoir-react";
import UsersModal from "../modals/users-modal";
import { useState } from "react";

export default function ItemList({
  items,
  eventId,
  isLoading,
  isRadio,
  selected,
  setSelected,
}) {
  const [isUsersModalOpen, setIsUsersModalOpen] = useState(false);

  if (!items || items.length === 0) return null;

  return (
    <>
      <div className={`flex flex-col w-full`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          const Icon = item.icon;

          return (
            <div
              key={index}
              className={`${
                isRadio && "cursor-pointer"
              } flex items-center gap-3 w-full`}
              onClick={
                isRadio && setSelected ? () => setSelected(index) : undefined
              }
            >
              {item.type === "payment" ? (
                <div className="flex items-center justify-between py-3 w-full">
                  <p>
                    <span className="dark-text">Montant total</span>{" "}
                    {"x1 " + item.ticket}
                  </p>
                  <p className="dark-text !font-bold">{item.price + "€"}</p>
                </div>
              ) : (
                <>
                  {isRadio &&
                    (selected === index ? (
                      <CheckCircleSolid className="h-6 w-6 blue-text" />
                    ) : (
                      <Circle className="h-6 w-6 text-[var(--light-gray)]" />
                    ))}
                  {Icon && (
                    <Icon className="h-6 w-6 text-[var(--light-gray)]" />
                  )}
                  <div
                    className={`w-full py-3 flex items-center justify-between gap-2 ${
                      !isLast && "border-b border-[var(--secondary-border-col)]"
                    }`}
                  >
                    {isLoading ? (
                      <p className="skeleton-bg">Texte de l'élément</p>
                    ) : selected === index ? (
                      <p className="blue-text">{item.value}</p>
                    ) : (
                      <div className="flex flex-wrap gap-2">
                        <p className="dark-text">{item.value} </p>
                        {item.information && (
                          <p className="green-text">{item.information}</p>
                        )}
                        {item.error && <p className="red-text">{item.error}</p>}
                      </div>
                    )}
                    {item.type === "users" && (
                      <button
                        className="secondary-btn"
                        onClick={() => setIsUsersModalOpen(true)}
                      >
                        <span>Consulter</span>
                        <NavArrowRight />
                      </button>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
      <UsersModal
        isOpen={isUsersModalOpen}
        setIsOpen={() => setIsUsersModalOpen(!isUsersModalOpen)}
        eventId={eventId}
      />
    </>
  );
}
