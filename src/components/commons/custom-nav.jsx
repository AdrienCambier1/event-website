"use client";
import { Home } from "iconoir-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function CustomNav({ navigation, disabledHome, homeLink }) {
  const pathname = usePathname();

  return (
    <div className="custom-nav">
      {!disabledHome && (
        <Link href={homeLink || "/"} className="px-4">
          <Home className="h-6 w-6 text-[var(--primary-blue)] hover:opacity-75 transition" />
        </Link>
      )}
      {navigation.map((item, index) => {
        if (!item.href) return null;

        const isActive = pathname.includes(item.href);

        return (
          <Link
            href={item.href}
            key={index}
            className={
              isActive ? "primary-btn" : "blue-rounded-btn !bg-transparent"
            }
          >
            <span>{item.name}</span>
          </Link>
        );
      })}
    </div>
  );
}
