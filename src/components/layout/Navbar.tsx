import Link from "next/link";
import { Suspense } from "react";
import { NavLinks } from "./NavLinks";
import { UserMenu } from "./UserMenu";

export function Navbar() {
  return (
    <header className="flex flex-wrap items-center justify-between gap-4 px-6 py-4 md:px-8">
      <Link href="/" className="text-3xl font-bold text-blossom-50">
        Music.io
      </Link>
      <nav aria-label="Main" className="flex items-center gap-6">
        <NavLinks />
        <Suspense fallback={<div className="h-9 w-20 rounded-full bg-white/10" aria-hidden="true" />}>
          <UserMenu />
        </Suspense>
      </nav>
    </header>
  );
}
