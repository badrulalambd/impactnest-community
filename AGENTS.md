<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

## Project

- Next.js 16.4.3 App Router (`src/app`), React 19.3, TypeScript strict, Tailwind CSS v4. npm is the package manager (`package-lock.json` present — don't add yarn/pnpm lockfiles).
- Path alias: `@/*` → `./src/*` (e.g. `@/components/home/Banner`).
- Shared types go in `src/type/type.ts` (currently holds `IEventType`).
- shadcn/ui v4 in `base-nova` style, built on `@base-ui/react` (**not Radix**): components live in `src/components/ui/`, add more via `npx shadcn add <component>`. Compose primitives with base-ui's `render` prop — `asChild` does not exist in this setup. `cn()` comes from the `cn` package (re-exported by `@/lib/utils`).
- Brand colors are tokens in `src/app/globals.css`: `brand-navy` #073763 (also mapped to shadcn `--primary`), `brand-orange` #FF7900, `brand-green` #4DAB2B — e.g. `text-brand-navy`, `bg-brand-green`.
- Dark mode uses `next-themes` (`ThemeProvider` in `src/components/theme-provider/theme-provider.tsx`, class on `<html>`); the `dark:` variant matches descendants of `.dark` only.
- Toasts use `react-hot-toast` (`Toaster` in `src/app/layout.tsx`); auth events surface via `src/components/auth/auth-toast-listener.tsx`.

## Architecture

- **Auth: better-auth + MongoDB.** Server config in `src/lib/auth.ts` (mongodb adapter, email/password + Google social login), client hooks (`signIn`, `useSession`, …) in `src/lib/auth-client.ts` (`better-auth/react`), HTTP handler at `src/app/api/auth/[...all]/route.ts`. Login/register pages: `src/app/login`, `src/app/register`.
- **Events come from an external API**, not this repo: server components fetch `${NEXT_PUBLIC_DESTINATIONS_API_BASE_URL}/events` (defaults to `http://localhost:5000`) with `cache: "no-store"`. The events CRUD UI lives in `src/components/events/` and `src/app/events/` (`create-event`, `manage-events`, `joined-events`, `events/[eventId]`).
- **Env vars** (in gitignored `.env`, required for auth/events to work): `MONGODB_URL`, `BETTER_AUTH_URL`, `BETTER_AUTH_SECRET`, `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET`, `NEXT_PUBLIC_DESTINATIONS_API_BASE_URL`. `src/lib/auth.ts` imports `dotenv/config` explicitly.

## Commands

- `npm run dev` — dev server (Turbopack)
- `npm run lint` — ESLint (flat config, eslint-config-next)
- `npm run build` — production build; run it to verify work compiles
- There is **no** test runner or typecheck script. Typecheck with `npx tsc --noEmit`.

## Toolchain quirks

- **React Compiler is enabled** (`reactCompiler: true` + `babel-plugin-react-compiler`). Write compiler-friendly components: no prop/state mutation, and skip manual `useMemo`/`useCallback` — memoization is automatic.
- **Tailwind v4 runs through Turbopack, not PostCSS**: `next.config.ts` maps `*.css` to the `@tailwindcss/turbopack` loader. CSS uses Tailwind v4 syntax (`@import "tailwindcss"`, `@theme inline`) — there is no `tailwind.config.js`; don't add one.
- Next.js here is newer than most training data (e.g. `next dev` writes typed-route conventions into this file). Consult `node_modules/next/dist/docs/` before writing unfamiliar Next code.
- Images from `public/` are served from the root path: `src="/ic-logo-desktop.png"`, never `/public/...`.
