import type { Metadata } from "next";
import { Suspense } from "react";
import { Hero } from "@/components/layout/Hero";
import { SearchBar } from "@/components/layout/SearchBar";

export const metadata: Metadata = { title: "Search" };

async function SearchResults({ searchParams }: { searchParams: PageProps<"/search">["searchParams"] }) {
  const { q } = await searchParams;
  const query = typeof q === "string" ? q.trim() : "";
  return (
    <>
      <SearchBar defaultValue={query} />
      <p className="mt-8 text-center text-eggplant-200">
        {query ? `Searching for “${query}” arrives with the music player.` : "Type a song, artist or mood."}
      </p>
    </>
  );
}

export default function SearchPage(props: PageProps<"/search">) {
  return (
    <main>
      <Hero>
        <Suspense fallback={<SearchBar />}>
          <SearchResults searchParams={props.searchParams} />
        </Suspense>
      </Hero>
    </main>
  );
}
