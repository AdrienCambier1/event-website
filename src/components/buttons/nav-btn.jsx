"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function NavBtn({
  icon: Icon,
  href = "",
  onClick,
  label,
  children,
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  const navBtnContent = () => (
    <>
      <div
        className={
          isActive
            ? "bg-[var(--primary-blue)] blue-shadow"
            : "bg-[rgba(var(--primary-blue-rgb),0.1)]"
        }
      >
        {Icon && <Icon className={isActive ? "text-white" : "blue-text"} />}
        {children}
      </div>
      <span className="blue-text">{label}</span>
    </>
  );

  return (
    <>
      {onClick ? (
        <div className="nav-btn" onClick={onClick}>
          {navBtnContent()}
        </div>
      ) : (
        <Link href={href} className="nav-btn">
          {navBtnContent()}
        </Link>
      )}
    </>
  );
}
