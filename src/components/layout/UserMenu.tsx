import Link from "next/link";
import { auth, signOut } from "@/auth";
import { buttonClass } from "@/components/ui/Button";

// Reads the session, so it must be rendered inside <Suspense>.
export async function UserMenu() {
  const session = await auth();

  if (!session?.user) {
    return (
      <Link href="/login" className={buttonClass("ghost", "px-5 py-2 text-sm")}>
        Sign in
      </Link>
    );
  }

  return (
    <div className="flex items-center gap-3">
      <span className="hidden text-sm text-blossom-50 sm:inline">{session.user.name ?? session.user.email}</span>
      <form
        action={async () => {
          "use server";
          await signOut({ redirectTo: "/" });
        }}
      >
        <button type="submit" className={buttonClass("ghost", "px-5 py-2 text-sm")}>
          Sign out
        </button>
      </form>
    </div>
  );
}
