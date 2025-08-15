"use client";
import ReactFocusLock from "react-focus-lock";
import ModalBg from "./modal-bg";
import ReactDOM from "react-dom";
import { Megaphone } from "iconoir-react";
import ItemList from "../lists/item-list";
import { useState, useEffect } from "react";

export default function ReportModal({ isOpen, setIsOpen, eventId, name }) {
  const [selected, setSelected] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setSelected(0);
    }
  }, [isOpen]);

  const reports = [
    {
      type: "SPAM",
      value: "Spam",
      description:
        "L'événement semble être du spam, une arnaque ou une publicité abusive.",
    },
    {
      type: "INAPPROPRIATE_CONTENT",
      value: "Contenu inapproprié",
      description:
        "L'événement contient des propos, images ou liens inappropriés ou offensants.",
    },
    {
      type: "OTHER",
      value: "Autre",
      description: "Autre motif.",
    },
  ];

  const handleSubmit = async () => {
    // Handle form submission
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
              <Megaphone />
            </div>
            <h3 className="text-center">Signaler l'événement {name}</h3>
          </div>
          <form>
            <div className="flex flex-col gap-2 w-full">
              <p className="dark-text">Motif du signalement</p>
              <ItemList
                items={reports}
                isRadio={true}
                selected={selected}
                setSelected={setSelected}
              />
            </div>
            {reports[selected]?.type === "OTHER" && (
              <div className="flex flex-col gap-2 w-full">
                <label>Description</label>
                <textarea placeholder="Décrivez votre signalement"></textarea>
              </div>
            )}
          </form>
          <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
            <button className="secondary-form-btn" onClick={setIsOpen}>
              <span>Annuler</span>
            </button>
            <button className="primary-form-btn" onClick={handleSubmit}>
              <span>Signaler</span>
            </button>
          </div>
        </div>
      </ReactFocusLock>
      <ModalBg className="!z-40" isOpen={isOpen} setIsOpen={setIsOpen} />
    </>,
    document.querySelector("body")
  );
}
