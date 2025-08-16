"use client";
import { useState, useRef, useEffect } from "react";
import ModalBg from "./modal-bg";
import ReactFocusLock from "react-focus-lock";
import { useSearchModal } from "@/contexts/search-modal-context";
import SearchBarInput from "../commons/search-bar-input";
import SearchList from "../lists/search-list";

export default function SearchBarModal() {
  const { isSearchModalOpen, closeSearchModal } = useSearchModal();
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState("all");
  const inputRef = useRef(null);
  const modalRef = useRef(null);

  const searchTypes = [
    { label: "Tous", value: "all" },
    { label: "Evenements", value: "events" },
    { label: "Villes", value: "cities" },
    { label: "Lieux", value: "places" },
    { label: "Organisateurs", value: "organisers" },
  ];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        closeSearchModal();
      }
    };

    if (isSearchModalOpen) {
      document.addEventListener("keydown", handleKeyDown);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isSearchModalOpen]);

  useEffect(() => {
    if (isSearchModalOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isSearchModalOpen]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <>
      <ReactFocusLock
        ref={modalRef}
        className={`${
          isSearchModalOpen ? "visible" : "invisible"
        } modal-container flex-col !justify-start`}
      >
        <SearchBarInput
          inputRef={inputRef}
          searchTypes={searchTypes}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          searchType={searchType}
          setSearchType={setSearchType}
        />

        <SearchList isSearchModalOpen={isSearchModalOpen} />
      </ReactFocusLock>
      <ModalBg isOpen={isSearchModalOpen} setIsOpen={closeSearchModal} />
    </>
  );
}
