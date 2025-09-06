import { useState, useEffect } from "react";
import { useEventReport } from "@/hooks/use-event";
import ReportModal from "../modals/report-modal";
import DialogModal from "../modals/dialog-modal";
import { Check, CloudXmark } from "iconoir-react";
import { usePathname, useRouter } from "next/navigation";

export default function ReportBtn({
  title,
  isAuthenticated,
  token,
  userId,
  organizerId,
}) {
  const [reportModal, setReportModal] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);
  const [reportError, setReportError] = useState(false);
  const [selected, setSelected] = useState(0);
  const [description, setDescription] = useState("");
  const router = useRouter();
  const pathname = usePathname();

  const { sendReport, loading: reportLoading } = useEventReport(token);

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
      description: description,
    },
  ];

  useEffect(() => {
    if (reportModal) {
      setSelected(0);
      setDescription("");
    }
  }, [reportModal]);

  const handleClick = () => {
    if (!isAuthenticated) {
      router.push(`/connexion?redirect=${encodeURIComponent(pathname)}`);
    } else {
      setReportModal(true);
    }
  };

  const handleSubmit = async () => {
    try {
      const result = await sendReport({
        reportType: reports[selected].type,
        description: reports[selected].description,
        senderUserId: userId,
        reportedUserId: organizerId,
      });

      if (!result) {
        throw new Error("Erreur lors de l'envoi du signalement");
      }

      setDescription("");
      setReportSuccess(true);
      setReportModal(false);
    } catch (e) {
      setReportError(true);
      setReportModal(false);
    }
  };

  return (
    <>
      <button className="primary-btn" onClick={handleClick}>
        <span>Signaler l'événement</span>
      </button>
      <ReportModal
        isOpen={reportModal}
        setIsOpen={() => setReportModal(false)}
        name={title}
        onClick={handleSubmit}
        selected={selected}
        setSelected={setSelected}
        reports={reports}
        description={description}
        setDescription={setDescription}
        isLoading={reportLoading}
      />
      <DialogModal
        title="Signalement effectué"
        isOpen={reportSuccess}
        setIsOpen={() => setReportSuccess(false)}
        icon={Check}
        description={
          <>
            Le signalement pour l'événement{" "}
            <span className="dark-text">{title}</span> a bien été prise en
            compte. Retrouver votre billet dans la rubrique{" "}
          </>
        }
      />
      <DialogModal
        title="Impossible de signaler"
        isOpen={reportError}
        setIsOpen={() => setReportError(false)}
        icon={CloudXmark}
        isDangerous={true}
        description={
          <>
            Erreur lors du signalement de l'événement{" "}
            <span className="dark-text">{title}</span>.
          </>
        }
      />
    </>
  );
}
