import type { Metadata } from "next";
import { signIn } from "@/auth";
import { authProviders } from "@/lib/env";
import { Hero } from "@/components/layout/Hero";
import { Button } from "@/components/ui/Button";

export const metadata: Metadata = { title: "Sign in" };

export default function LoginPage() {
  return (
    <main>
      <Hero>
        <h1 className="text-center font-serif text-4xl font-bold text-white md:text-5xl">
          Sign in to <span className="text-blossom-300">Music.io</span>
        </h1>
      </Hero>
      <section className="mx-auto -mt-16 mb-16 max-w-md px-4">
        <div className="space-y-4 rounded-3xl bg-white p-8 shadow-xl">
          <form
            action={async () => {
              "use server";
              await signIn("demo", { redirectTo: "/library" });
            }}
          >
            <Button type="submit" className="w-full">
              Try the demo account
            </Button>
          </form>
          <p className="text-center text-sm text-eggplant-500">No sign-up needed. One click and you’re in.</p>

          {(authProviders.github || authProviders.google) && (
            <div className="space-y-3 border-t border-eggplant-100 pt-4">
              {authProviders.github && (
                <form
                  action={async () => {
                    "use server";
                    await signIn("github", { redirectTo: "/library" });
                  }}
                >
                  <button type="submit" className="w-full rounded-full border border-eggplant-200 py-3 font-semibold text-eggplant-800 hover:bg-eggplant-50">
                    Continue with GitHub
                  </button>
                </form>
              )}
              {authProviders.google && (
                <form
                  action={async () => {
                    "use server";
                    await signIn("google", { redirectTo: "/library" });
                  }}
                >
                  <button type="submit" className="w-full rounded-full border border-eggplant-200 py-3 font-semibold text-eggplant-800 hover:bg-eggplant-50">
                    Continue with Google
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
