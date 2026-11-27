import type { Metadata } from "next";
import { Hero } from "@/components/layout/Hero";

export const metadata: Metadata = { title: "About" };

export default function AboutPage() {
  return (
    <main>
      <Hero>
        <h1 className="text-center font-serif text-4xl font-bold leading-tight text-white md:text-6xl md:leading-tight">
          About <span className="text-blossom-300">Music.io</span>
        </h1>
      </Hero>
      <section className="mx-auto max-w-2xl px-4 py-16 leading-relaxed text-eggplant-800">
        <p>
          Music.io is a free music streaming app built with Next.js, TypeScript and PostgreSQL. It streams
          full-length, licensed tracks from independent artists through the Jamendo catalog.
        </p>
        <p className="mt-4">
          You can build playlists, upload your own tracks, watch the music with a live visualizer, and listen
          together with friends in shared rooms.
        </p>
      </section>
    </main>
  );
}
