# Music.io: Next.js Full-Stack Rebuild (Design Spec)

Date: 2026-11-05
Status: Draft for review

## 1. Goal

Rebuild music.io from a Create React App landing page and blog into a full-stack
music streaming app built with Next.js. It's a CV project aimed at well-paid
frontend and full-stack roles.

**Success means:**
- A live app on Vercel that a recruiter can open and use within a minute, using a demo login button
- Full-length music playback that keeps playing while you move between pages
- Three standout features: audio visualizer, Listen Together rooms, AI playlist generator
- Tests and CI on every push, a Lighthouse score of 90+, and accessible player controls
- A README with a demo GIF, an architecture diagram and the technical decisions
- Free-tier hosting only

**How we work:** the developer writes all code. Each implementation plan step says
what to build and why, gives hints and a "done when" check, and ends with a code review.
The developer knows React, hooks, React Router, fetch and Tailwind, has some
TypeScript, is new to Next.js and is assumed new to SQL. Plans explain Next.js and
database ideas fully and keep TypeScript explanations short.

**Out of scope for now:** the blog feature. It's kept under the git tag `cra-legacy`
and may come back later as its own project.

## 2. Current state

- Create React App + React 19 + React Router + Tailwind 3 with a custom palette
  (`eggplant`, `blossom`, `viola`, `bizarre`) in `tailwind.config.js`
- Styled components worth porting: `Navbar`, `Header`, `Tagline`, `SearchBar`,
  `HeaderComponent` (feature card), the form styles in `Create.jsx`
- Blog CRUD using `json-server` (port 9000) and a `useFetch` hook
- No audio, login or database. `MusicDetails`, `Sidebar` and `Home` are empty placeholders
- There are uncommitted changes. They must be committed before migration starts

## 3. Stack

| Concern | Choice |
|---|---|
| Framework | Next.js (App Router) + TypeScript (strict) |
| Styling | Tailwind with the existing palette ported over |
| Database | PostgreSQL on Neon + Prisma |
| Auth | Auth.js (GitHub + Google) + a demo account login |
| Validation | Zod (env vars, Server Action inputs, external API responses) |
| Client state | Zustand (player) |
| Catalog | Jamendo API (full-length, licensed tracks) |
| Uploads | UploadThing (audio + cover images) |
| Real-time | Ably, behind a `RealtimeClient` interface |
| AI | Claude API, Haiku 5.5, structured JSON output |
| Tests | Vitest + Testing Library, Playwright |
| CI/CD | GitHub Actions (lint, typecheck, test, build) + Vercel previews |

## 4. Repository and structure

- Same git repo. Tag the current CRA version as `cra-legacy`, then replace it with
  Next.js on the branch `next-migration`.
- Organize code by feature:

```
src/
  app/              routes: (marketing), (app)/browse, search, album/[id],
                    artist/[id], playlist/[id], library, upload, room/[code],
                    ai, api/(auth, time, ably-token, uploadthing, stream)
  features/
    player/         store.ts, AudioEngine, PlayerBar, useCurrentTime
    catalog/        jamendo.ts (typed client), TrackRow, AlbumCard, ArtistCard
    library/        likes, playlists, history (actions + components)
    uploads/
    visualizer/
    rooms/          RealtimeClient interface, Ably adapter, sync math, room UI
    ai-playlist/
  components/ui/    Button, Input, Card, Skeleton (from the current design)
  lib/              db.ts, auth.ts, env.ts, utils.ts
prisma/schema.prisma
tests/e2e/
```

## 5. Data model

Jamendo tracks and uploaded tracks share one `Track` table. A Jamendo track is
saved to the database the first time a user likes it, adds it to a playlist,
plays it in a room, or listens to it (history). After that, all features only
work with `Track`.

```
User           id, name, email, image  (+ Auth.js Account, Session, VerificationToken)

Track          id, source (JAMENDO | UPLOAD), externalId?, title, artistName,
               albumName?, durationSec, audioUrl, coverUrl?, uploaderId? -> User,
               createdAt
               @@unique([source, externalId])

Like           userId, trackId, createdAt             @@id([userId, trackId])

Playlist       id, ownerId -> User, name, description?, isPublic (default false),
               aiPrompt?, createdAt, updatedAt
PlaylistTrack  playlistId, trackId, position, addedAt
               @@unique([playlistId, position])

PlayHistory    id, userId, trackId, playedAt          @@index([userId, playedAt])

Room           id, code (unique, 6 chars), hostId -> User, currentTrackId?,
               isPlaying, positionSec, stateUpdatedAt, createdAt

AiGeneration   id, userId -> User, prompt, createdAt   @@index([userId, createdAt])
```

Decisions:
- Room state is saved to the database so late joiners can catch up. Live updates come through Ably.
- Queue and volume live only in the browser (Zustand + localStorage). They aren't saved to the database.
- Reordering a playlist rewrites every `position` inside one transaction.
- There's no separate artist role. Any logged-in user can upload, and uploads show on their profile.

## 6. Player architecture

- One `<audio>` element, rendered by `AudioEngine` in the `(app)` root layout.
  Layouts stay mounted when you navigate, so playback continues across pages.
- The Zustand store keeps `queue`, `currentIndex`, `isPlaying`, `shuffle`,
  `repeat (off | all | one)` and `volume`. Its actions are `playTrack`,
  `playQueue(tracks, startIndex)`, `toggle`, `next`, `prev`, `seek`, `setVolume`,
  `toggleShuffle` and `cycleRepeat`. UI components only call these actions.
- `AudioEngine` is the only code that touches the audio element. It applies store
  changes to the element and reports `ended` and `error` back to the store.
- The current time is read through a `useCurrentTime` hook (subscribes to `timeupdate`
  directly), not the store, to avoid re-rendering the whole app.
- Queue, current index and volume are saved to localStorage.
- A `PlayHistory` row is written after 30 seconds of playback.

## 7. Data flow

- Browse, album, artist, search and playlist pages are Server Components.
  Jamendo is called only on the server (the client ID stays private) and cached
  with `revalidate: 3600`.
- `features/catalog/jamendo.ts` is the only Jamendo client. It checks responses
  with Zod and converts them into a shared `TrackDTO` shape.
- Changes (like, playlist CRUD and reorder, upload, room control, AI generate) are
  Server Actions. Each one checks auth, validates with Zod, runs Prisma, and
  returns `{ ok: true, data } | { ok: false, error }`.
- The like button and playlist edits update instantly using `useOptimistic`.
- Search is driven by the URL (`/search?q=`), with a 300 ms debounce while typing.

## 8. Standout features

### 8.1 Audio visualizer
- Audio graph: `AudioContext` -> `createMediaElementSource(audio)` (created
  exactly once) -> `AnalyserNode` -> `destination`. The context is created or
  resumed on the first Play click.
- A `<canvas>` is drawn in a `requestAnimationFrame` loop. Modes are `bars`
  (frequency data) and `wave` (time-domain data), in the blossom and viola colors.
- There's a mini version in the PlayerBar and a full version in Now Playing.
- The loop pauses while audio is paused or `document.hidden` is true. With
  `prefers-reduced-motion`, a static image is shown instead.
- **CORS risk:** project 2 starts with a spike. Play a Jamendo track with
  `crossOrigin="anonymous"` and check that playback works and the analyser returns
  non-zero data. If it fails, add `/api/stream/[id]`, a streaming proxy that
  supports Range requests, and use it as the audio source for Jamendo tracks.

### 8.2 Listen Together rooms
- The host controls the room. Only the host can play, pause, seek or change the
  track. Each control is a Server Action that checks `hostId`, saves the Room
  state, and then publishes from the server through the Ably REST client.
- Clients get Ably tokens from `/api/ably-token`. Listeners can only subscribe
  and use presence. They can't publish.
- Message: `{ type: "state", trackId, isPlaying, positionSec, at }`, where `at`
  is server time in ms.
- Listener sync: `expected = positionSec + (serverNow - at) / 1000` while playing.
  If `|audio.currentTime - expected| > 0.5`, the listener seeks to `expected`.
  `serverNow = Date.now() + clockOffset`, where `clockOffset` comes from 3 pings to
  `/api/time` (use the sample with the lowest round-trip time; offset =
  serverTime - (sent + rtt / 2)).
- Rooms are shared by code or link at `/room/[code]`. Ably presence shows who's listening.
- Listeners must click "Join and listen" because of browser autoplay rules.
- When the host leaves (presence), listeners pause and see "Host disconnected".
- `RealtimeClient` interface: `subscribe(channel, handler)`,
  `enterPresence(channel, data)`, `onPresence(channel, handler)` and `close()`.
  Ably is the only adapter.

### 8.3 AI playlist generator
- The user enters a prompt (max 200 chars) and a song count (10 to 30).
- A Server Action calls the Claude API (Haiku 5.5) with structured output:
  `{ name, description, tags: string[], genres: string[], speed?: "low"|"medium"|"high" }`.
  The response is validated with Zod.
- The model returns **search criteria, not song titles**, so every track exists.
  Our code searches Jamendo with those criteria, merges results, removes
  duplicates, and trims to the requested count.
- The user previews the playlist, can remove tracks, then saves it as a `Playlist`
  with `aiPrompt` set.
- Limits: 5 generations per user per day (each generation writes one
  `AiGeneration` row, and the limit counts today's rows), a 15-second timeout,
  and a friendly error message on failure.

## 9. Error handling

- Each route group has `loading.tsx` (skeletons), `error.tsx` (Try again) and `not-found.tsx`.
- If Jamendo fails, the page shows "Catalog unavailable" and doesn't crash.
- If a track fails to play, a toast appears and the player skips to the next track.
  After 3 failures in a row, playback stops.
- Server Actions never return raw errors. Forms show field-level Zod messages.
- If Ably disconnects, the room shows "Reconnecting…" and catches up from the
  saved Room state when it reconnects.
- `lib/env.ts` validates every environment variable with Zod at startup.

## 10. Testing

- Unit tests (Vitest): player store, sync math and clock offset, Jamendo
  conversion, AI response validation and Jamendo query building, playlist reordering.
- Component tests (Testing Library): PlayerBar, LikeButton, PlaylistEditor.
- End-to-end tests (Playwright): demo login -> search -> play -> like -> create
  playlist; two browser contexts in one room staying in sync. Jamendo, Claude and
  Ably are faked in tests.
- CI runs lint, typecheck, unit tests, build and end-to-end tests on every push and PR.

## 11. Roadmap (each item gets its own implementation plan)

1. **Foundation:** commit pending work, tag `cra-legacy`, scaffold Next.js +
   TypeScript, port the palette and existing UI, env validation, Prisma + Neon,
   Auth.js + demo login, Vitest + CI, first Vercel deploy.
2. **Music player:** CORS spike, Jamendo client, browse, album, artist and search
   pages, player store, AudioEngine, PlayerBar, queue, history.
3. **Library:** likes, playlists (CRUD and reorder), library page, uploads.
4. **Audio visualizer.**
5. **Listen Together rooms.**
6. **AI playlist generator.**
7. **Polish:** accessibility (keyboard shortcuts, ARIA, axe), performance (next/image,
   lazy loading, Lighthouse 90+), SEO and OG images, Media Session API, rate
   limiting, README with GIF and architecture diagram.
