import { NavArrowLeft, NavArrowRight } from "iconoir-react";

export default function Pagination({
  currentPage,
  totalPages,
  onPrev,
  onNext,
}) {
  return (
    <div className="flex gap-6 justify-center items-center flex-wrap">
      <button
        className="secondary-btn"
        onClick={onPrev}
        disabled={currentPage === 1}
      >
        <NavArrowLeft />
        <span>Précédente</span>
      </button>
      <div className="primary-btn pointer-events-none">
        <span>
          Page {currentPage} sur {totalPages}
        </span>
      </div>
      <button
        className="secondary-btn"
        onClick={onNext}
        disabled={currentPage === totalPages}
      >
        <span>Suivante</span>
        <NavArrowRight />
      </button>
    </div>
  );
}
