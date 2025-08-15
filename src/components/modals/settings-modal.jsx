"use client";
import ReactFocusLock from "react-focus-lock";
import ModalBg from "./modal-bg";
import ReactDOM from "react-dom";
import { useState, useEffect } from "react";
import { User, Phone, AtSign, Lock } from "iconoir-react";

export default function SettingsModal({
  isOpen,
  setIsOpen,
  type = "name",
  user,
}) {
  const [mounted, setMounted] = useState(false);
  const [formValues, setFormValues] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    pseudo: "",
    currentPassword: "",
    password: "",
  });

  const modalConfig = {
    name: {
      icon: User,
      title: "Modification du nom et prénom",
      fields: [
        {
          name: "firstName",
          label: "Prénom",
          type: "text",
          placeholder: "Gérard",
        },
        {
          name: "lastName",
          label: "Nom",
          type: "text",
          placeholder: "Dupont",
        },
      ],
    },
    phone: {
      icon: Phone,
      title: "Modification du numéro de téléphone",
      fields: [
        {
          name: "phone",
          label: "Numéro de téléphone",
          type: "tel",
          placeholder: "06 12 34 56 78",
        },
      ],
    },
    pseudo: {
      icon: AtSign,
      title: "Modification du pseudo",
      fields: [
        {
          name: "pseudo",
          label: "Pseudo",
          type: "text",
          placeholder: "MonPseudo123",
        },
      ],
    },
    password: {
      icon: Lock,
      title: "Modification du mot de passe",
      fields: [
        {
          name: "currentPassword",
          label: "Mot de passe actuel",
          type: "password",
          placeholder: "Votre mot de passe actuel",
        },
        {
          name: "password",
          label: "Nouveau mot de passe",
          type: "password",
          placeholder: "Nouveau mot de passe",
        },
        {
          name: "confirmPassword",
          label: "Confirmer le mot de passe",
          type: "password",
          placeholder: "Confirmer le nouveau mot de passe",
        },
      ],
    },
  };

  const config = modalConfig[type] || modalConfig.name;
  const Icon = config.icon;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormValues({
      firstName: "",
      lastName: "",
      phone: "",
      pseudo: "",
      currentPassword: "",
      password: "",
      confirmPassword: "",
    });
    setIsOpen(false);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen && user) {
      setFormValues((prev) => ({
        ...prev,
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        phone: user.phone || "",
        pseudo: user.pseudo || "",
        currentPassword: "",
        password: "",
        confirmPassword: "",
      }));
    }
  }, [isOpen, user]);

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
            <div className="img-gradient-blue">{Icon && <Icon />}</div>
            <h3 className="text-center">{config.title}</h3>
          </div>
          <form>
            {config.fields.map((field) => (
              <div key={field.name} className="flex flex-col gap-2 w-full">
                <label htmlFor={field.name}>{field.label}</label>
                <input
                  id={field.name}
                  name={field.name}
                  type={field.type}
                  value={formValues[field.name] || ""}
                  onChange={handleChange}
                  placeholder={field.placeholder}
                />
              </div>
            ))}
          </form>
          <div className="flex flex-col-reverse md:flex-row gap-4 w-full">
            <button className="secondary-form-btn" onClick={setIsOpen}>
              <span>Annuler</span>
            </button>
            <button className="primary-form-btn" onClick={handleSubmit}>
              <span>Sauvegarder</span>
            </button>
          </div>
        </div>
      </ReactFocusLock>
      <ModalBg className="!z-40" isOpen={isOpen} setIsOpen={setIsOpen} />
    </>,
    document.querySelector("body")
  );
}
