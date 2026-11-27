"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/library", label: "Library" },
] as const;

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul className="flex items-center gap-5">
      {links.map((link) => {
        const active = pathname === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              aria-current={active ? "page" : undefined}
              className={`hover:text-blossom-300 ${active ? "font-semibold text-blossom-300" : "text-blossom-50"}`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
