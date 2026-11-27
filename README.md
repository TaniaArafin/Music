# Music.io

Where every emotion finds its sound. Music.io is a free, full-stack music streaming app built with
Next.js, TypeScript and PostgreSQL.

> Status: **Phase 1 (Foundation) done.** The music player, library, visualizer and Listen Together
> rooms come next. See the [design spec](docs/superpowers/specs/2026-11-05-music-io-nextjs-design.md).

## Stack

| Area | Technology |
|---|---|
| Framework | Next.js 16 (App Router, Cache Components) + TypeScript (strict) |
| Styling | Tailwind CSS 4 with the music.io palette |
| Database | PostgreSQL (Docker locally, Neon in production) + Prisma 7 |
| Login | Auth.js: one-click demo account, optional GitHub and Google |
| Validation | Zod |
| Tests | Vitest + Testing Library |
| CI | GitHub Actions: lint, typecheck, tests, migrations, build |

Every service has a free plan. Nothing in this project needs a paid account.

## Run it locally

Requirements: Node.js 22 and Docker.

```bash
npm install
cp .env.example .env          # then set AUTH_SECRET: openssl rand -base64 32
npm run db:up                 # starts Postgres on localhost:5433
npm run db:migrate            # creates the tables
npm run dev                   # http://localhost:3000
```

Open `/login` and click **Try the demo account**.

To turn on GitHub or Google login, create an OAuth app and fill in the `AUTH_GITHUB_*` or
`AUTH_GOOGLE_*` values in `.env`. The callback URL is `http://localhost:3000/api/auth/callback/github`
(or `/google`).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Start the dev server |
| `npm run build` | Production build |
| `npm run lint` | ESLint |
| `npm run typecheck` | Generate route types and run TypeScript |
| `npm test` | Unit and component tests |
| `npm run db:up` | Start the local database |
| `npm run db:migrate` | Create and apply a migration |

## Deploy for free (Vercel + Neon)

1. Create a free database at [neon.tech](https://neon.tech) and copy its connection string.
2. Import the GitHub repo into [Vercel](https://vercel.com) (Hobby plan).
3. Add the environment variables `DATABASE_URL` and `AUTH_SECRET` (plus OAuth values if you use them).
4. Set the build command to `npx prisma migrate deploy && npm run build`.

## Project structure

```
src/
  app/            routes: (marketing) home and about, login, search, (app)/library, api/auth
  components/     ui/ (Button, FeatureCard, Skeleton) and layout/ (Navbar, Hero, SearchBar)
  lib/            env checks, database client
  auth.ts         Auth.js setup
prisma/           schema and migrations
```

The original Create React App version is saved under the git tag `cra-legacy`.
