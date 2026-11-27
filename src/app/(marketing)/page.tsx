import { Hero } from "@/components/layout/Hero";
import { Tagline } from "@/components/layout/Tagline";
import { SearchBar } from "@/components/layout/SearchBar";
import { FeatureCard } from "@/components/ui/FeatureCard";

export default function HomePage() {
  return (
    <main>
      <Hero tall>
        <Tagline />
        <div className="mt-6">
          <SearchBar />
        </div>
      </Hero>
      <section className="relative z-10 mx-auto -mt-40 mb-16 max-w-5xl px-4">
        <div className="grid gap-8 rounded-[40px] bg-gradient-to-b from-eggplant-600/60 via-eggplant-600/25 to-eggplant-100/0 p-6 md:grid-cols-2 md:p-12">
          <FeatureCard icon="check" title="Recommend Everyone" content="Build playlists and share the songs that move you." />
          <FeatureCard icon="star" title="Best Play Music" content="Full-length tracks that keep playing while you browse." />
          <FeatureCard icon="users" title="Listen Together" content="Open a room, share the code and hear the same song at the same time." />
          <FeatureCard icon="wave" title="See the Sound" content="A live audio visualizer that dances with every beat." />
        </div>
      </section>
    </main>
  );
}
