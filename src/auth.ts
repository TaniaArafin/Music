import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { authProviders } from "@/lib/env";

export const DEMO_USER = {
  email: "demo@music.io",
  name: "Demo Listener",
};

const providers: Provider[] = [
  // One-click demo account so recruiters can try the app without signing up.
  Credentials({
    id: "demo",
    name: "Demo account",
    credentials: {},
    async authorize() {
      const user = await db.user.upsert({
        where: { email: DEMO_USER.email },
        update: {},
        create: DEMO_USER,
      });
      return { id: user.id, name: user.name, email: user.email, image: user.image };
    },
  }),
];

if (authProviders.github) providers.push(GitHub);
if (authProviders.google) providers.push(Google);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(db),
  // The demo login uses the Credentials provider, which needs JWT sessions.
  session: { strategy: "jwt" },
  providers,
  pages: { signIn: "/login" },
  callbacks: {
    session({ session, token }) {
      if (token.sub) session.user.id = token.sub;
      return session;
    },
  },
});
