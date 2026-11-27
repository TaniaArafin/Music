import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <main className="mx-auto w-full max-w-5xl space-y-6 px-4 py-16">
      <Skeleton className="h-12 w-1/2" />
      <Skeleton className="h-64" />
    </main>
  );
}
