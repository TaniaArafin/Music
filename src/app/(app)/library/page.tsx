import type { Metadata } from "next";
import { Suspense } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { Hero } from "@/components/layout/Hero";
import { Skeleton } from "@/components/ui/Skeleton";

export const metadata: Metadata = { title: "Your Library" };

async function LibraryContent() {
  const session = await auth();
  if (!session?.user) redirect("/login");

  return (
    <div className="rounded-3xl bg-white p-8 shadow-xl">
      <h2 className="font-serif text-2xl font-semibold text-eggplant-950">
        Welcome, {session.user.name ?? "listener"}
      </h2>
      <p className="mt-3 text-eggplant-600">
        Your liked songs, playlists and uploads will appear here.
      </p>
    </div>
  );
}

export default function LibraryPage() {
  return (
    <main>
      <Hero>
        <h1 className="text-center font-serif text-4xl font-bold text-white md:text-5xl">
          Your <span className="text-blossom-300">Library</span>
        </h1>
      </Hero>
      <section className="mx-auto -mt-16 mb-16 max-w-3xl px-4">
        <Suspense fallback={<Skeleton className="h-40" />}>
          <LibraryContent />
        </Suspense>
      </section>
    </main>
  );
}
