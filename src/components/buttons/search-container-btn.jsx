import { Check, NavArrowUp } from "iconoir-react";
import SearchElementBtn from "./search-element-btn/search-element-btn";
import { useState } from "react";
import { motion } from "framer-motion";
import { useSearchModal } from "@/contexts/search-modal-context";

export default function SearchContainerBtn({
  title,
  description,
  action,
  type,
}) {
  const [selected, setSelected] = useState(false);
  const { closeSearchModal } = useSearchModal();

  return (
    <div className="relative">
      <motion.div
        animate={{
          height: selected ? "auto" : 0,
          scaleY: selected ? 1 : 0,
          opacity: selected ? 1 : 0,
          paddingLeft: selected ? "0.75rem" : "2rem",
          paddingRight: selected ? "0.75rem" : "2rem",
          paddingBottom: selected ? "0.5rem" : "0",
        }}
        transition={{
          height: { duration: 0.3, ease: "easeInOut" },
          scaleY: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.3, ease: "easeInOut" },
          paddingLeft: { duration: 0.3, ease: "easeInOut" },
          paddingRight: { duration: 0.3, ease: "easeInOut" },
          paddingBottom: { duration: 0.3, ease: "easeInOut" },
        }}
        className="flex items-center justify-between pointer-events-auto cursor-pointer"
        onClick={() => setSelected(!selected)}
      >
        <p className="text-white">{title}</p>
        <NavArrowUp className="h-6 w-6 text-white" />
      </motion.div>

      <SearchElementBtn
        selected={selected}
        onClick={() => setSelected(!selected)}
        title={title}
        description={description}
        action={action}
        type={type}
        isParent={true}
      />
      <SearchElementBtn
        className={`${
          selected ? "opacity-0" : "opacity-100"
        } absolute bottom-0 -z-10 scale-x-95 w-full`}
      />
      <motion.div
        animate={{
          height: selected ? "auto" : 0,
          scaleX: selected ? 1 : 0.95,
          scaleY: selected ? 1 : 0,
          opacity: selected ? 1 : 0,
          paddingTop: selected ? "0.75rem" : "0.5rem",
          transformOrigin: "top",
        }}
        transition={{
          height: { duration: 0.3, ease: "easeInOut" },
          scaleX: { duration: 0.3, ease: "easeInOut" },
          scaleY: { duration: 0.3, ease: "easeInOut" },
          opacity: { duration: 0.3, ease: "easeInOut" },
        }}
        className="w-full -z-10 flex flex-col gap-3"
      >
        <SearchElementBtn onClick={closeSearchModal} />
        <SearchElementBtn onClick={closeSearchModal} />
        <SearchElementBtn onClick={closeSearchModal} />
      </motion.div>
    </div>
  );
}
