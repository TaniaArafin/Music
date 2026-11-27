import Link from "next/link";
import { buttonClass } from "@/components/ui/Button";

export default function NotFound() {
  return (
    <main className="mx-auto flex max-w-md flex-1 flex-col items-center justify-center gap-6 px-4 py-24 text-center">
      <h1 className="font-serif text-3xl font-bold text-eggplant-950">This page skipped a beat</h1>
      <p className="text-eggplant-600">We couldn’t find the page you were looking for.</p>
      <Link href="/" className={buttonClass()}>
        Back to home
      </Link>
    </main>
  );
}
