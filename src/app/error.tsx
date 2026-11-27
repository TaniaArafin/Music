"use client";

import { Button } from "@/components/ui/Button";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="font-serif text-3xl font-bold text-eggplant-950">Something went wrong</h1>
      <p className="text-eggplant-600">The page hit a problem. Please try again.</p>
      <Button onClick={reset}>Try again</Button>
    </main>
  );
}
