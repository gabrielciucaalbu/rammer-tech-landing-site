# AGENTS.md

## Cursor Cloud specific instructions

### Project overview

Rammer Tech landing/marketing site — a single Next.js 16 application (App Router) with React 19, TypeScript 5, Tailwind CSS v4, and shadcn/ui. No database, no Docker, no separate backend services. All content is static TypeScript/JSON.

### Running the app

- `pnpm dev` starts the dev server on **port 4000** (configured in `package.json`).
- The site has two locales: `ro` (default) and `en`. Browse at `http://localhost:4000/ro`.
- The English locale currently redirects to Romanian via middleware (intentional 302, not 301).

### Lint / Build / Test

- **Lint:** `pnpm lint` — runs ESLint v9. There are pre-existing lint warnings/errors in the repo; these are not regressions.
- **Build:** `pnpm build` — runs `ensure-indexnow-key.js` then `next build`. No env vars required for build to succeed.
- **Test:** No test framework is configured (no Jest, Vitest, or Playwright). Manual browser testing is the primary verification method.

### Environment variables

None are required for local development. The following are optional:

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend email API key — only needed if testing contact form email sending |
| `CONTACT_EMAIL_TO` | Destination email for contact form (defaults to `office@rammertech.ro`) |

### Key conventions

- See `README.md` for the full tech stack and file structure.
- See `.cursor/rules/` for brand colors and coding conventions.
- Package manager: **pnpm** (lockfile: `pnpm-lock.yaml`).
- Path alias: `@/*` → `./src/*`.

### Non-obvious caveats

- `pnpm install` may warn about ignored build scripts for `msw`, `sharp`, and `unrs-resolver`. This is expected with pnpm 10's default security policy and does not affect development. Do NOT run `pnpm approve-builds` (interactive). The site works fine without native `sharp` — Next.js falls back to its built-in image optimizer.
- The `middleware.ts` file triggers a deprecation warning during build ("middleware file convention is deprecated, use proxy instead"). This is a Next.js 16 deprecation notice and can be ignored for now.
