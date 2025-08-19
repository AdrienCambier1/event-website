"use client";
import ReactFocusLock from "react-focus-lock";
import ModalBg from "./modal-bg";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { ScanQrCode } from "iconoir-react";
import { QRCodeCanvas } from "qrcode.react";

export default function QrCodeModal({
  isOpen,
  setIsOpen,
  eventId,
  orderId,
  ticketId,
  name,
}) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return ReactDOM.createPortal(
    <>
      <ReactFocusLock
        className={`${isOpen ? "visible" : "invisible"} modal-container`}
      >
        <div
          className={`${isOpen ? "opacity-100" : "opacity-0"} modal-content`}
        >
          <div className="flex flex-col items-center gap-2">
            <div className="img-gradient-blue">{<ScanQrCode />}</div>
            <h3 className="text-center">Code QR de l'événement</h3>
          </div>
          <QRCodeCanvas
            value={`VV-${eventId}-${orderId}-${ticketId}`}
            size={200}
          />
          <p className="text-center">
            Votre code QR pour l'événement{" "}
            <span className="dark-text">{name}</span> à présenter le jour de
            l'événement.
          </p>
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
