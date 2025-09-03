"use client";
import { usePathname } from "next/navigation";
import Header from "@/components/header";
import Footer from "@/components/footer";
import SearchModal from "@/components/modals/search-modal";

export default function LayoutWrapper({ children }) {
  const pathname = usePathname();

  if (pathname === "/auth/callback") {
    return children;
  }

  return (
    <>
      <Header />
      {children}
      <Footer />
      <SearchModal />
    </>
  );
}
