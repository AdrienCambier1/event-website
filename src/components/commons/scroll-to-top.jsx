"use client";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";

function getMainSegment(path) {
  return path.split("/").filter(Boolean)[0] || "";
}

export default function ScrollToTop() {
  const pathname = usePathname();
  const lastMain = useRef(getMainSegment(pathname));

  useEffect(() => {
    const currentMain = getMainSegment(pathname);
    if (currentMain !== lastMain.current) {
      window.scrollTo(0, 0);
      lastMain.current = currentMain;
    }
  }, [pathname]);

  return null;
}
