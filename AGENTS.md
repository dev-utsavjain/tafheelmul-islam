# AGENTS.md

Guidance for AI coding agents working on the **Tafheem-ul-Islam** website — a
monorepo with a React/Vite frontend and a Go/Gin backend. All comments and
documentation are in English.

## Project overview

Website for the Tafheem-ul-Islam Trust (an NGO). It is a public marketing site
(home, about, mission, gallery, partners, contact, donate) plus an admin panel,
with two write flows: **donation pledges** and **contact messages**.

- `frontend/` — React 19 + TypeScript + Vite 6 SPA, styled with Tailwind CSS v4
  (via `@tailwindcss/vite`). State/data access talks directly to **Supabase**
  (Postgres tables, Storage buckets, and Auth) from the browser.
- `backend/` — Go 1.25 HTTP API (`module imagine_backend`) using Gin, GORM with
  the Postgres driver, and `golang-jwt/v5`. It currently exposes only three
  routes: `GET /api/health`, `POST /api/donations`, `POST /api/contact`
  (see `backend/internal/server/routes.go`). It also sends notification emails
  via Gmail SMTP (`net/smtp`) and can serve an embedded build of the SPA.

### How the two halves interact

The write flows are a **dual write**: the pages insert into Supabase directly
first, then POST the same payload to the Go backend so it can persist its own
copy and send emails:

- `frontend/src/pages/Donate.tsx` — Supabase insert into `tafheemul.donations`,
  then `fetch(`${BASE}/donations`)`.
- `frontend/src/pages/ContactPage.tsx` — Supabase insert into
  `tafheemul.contact_messages`, then `fetch(`${BASE}/contact`)`.
- `frontend/src/pages/AdminGalleryPage.tsx` — admin login via Supabase Auth
  (`signInWithPassword`), then CRUD on gallery/partners/offline-donation tables
  and Storage buckets, all client-side.
- `frontend/src/lib/api.ts` exports `BASE = '/api'` and contains an important
  comment: the deploy platform rewrites that **plain string literal** to
  `"<backendURL>/api"` — keep it a plain literal (no `import.meta.env`, no
  `??`/`||`/template strings), and request paths must be relative to it and not
  start with `/api`.
- Supabase table/bucket names and shared types live in
  `frontend/src/lib/supabase.ts` (schema `tafheemul`, buckets `gallery-images`,
  `gallery-videos`, `partner-photos`; PDF gallery items are stored in
  `gallery-images` too). Env vars `VITE_SUPABASE_URL` and
  `VITE_SUPABASE_ANON_KEY` must be set in `frontend/.env.local`; the client
  throws at startup if they are missing.

## Repository layout

```
backend/
  cmd/server/main.go        # entrypoint: server.StartServer()
  cmd/migration/main.go     # creates DB_SCHEMA, sets search_path, GORM AutoMigrate
  config/config.go          # env-var config (PORT, ENV, DB_*, JWT_SECRET)
  internal/
    server/                 # Gin engine setup + route registration; serves embedded SPA
    handler/                # HTTP handlers (healthcheck, donation, contact)
    services/               # business logic, Gmail SMTP mailer, HTML email templates
    repositary/             # GORM persistence (note the directory name's spelling)
    model/                  # GORM models: Donation, ContactMessage
    dto/                    # request DTOs with binding validation
    middleware/             # CORS, IP logging, error handler, rate limiter, JWT auth
    apperror/               # typed errors + JSON error responses
    db/db.go                # GORM Postgres connection (search_path = DB_SCHEMA)
    logger/                 # slog setup
    utils/generate_token.go # JWT helpers
    fs.go + internal/dist/  # go:embed of the built SPA (placeholder committed)
frontend/
  src/pages/                # route-level pages (Home, Donate, AdminGalleryPage, ...)
  src/components/           # shared sections (Navbar, Footer, Hero, Contact, ...)
  src/lib/                  # api.ts (backend base URL), supabase.ts (client + constants)
  index.html                # includes an imagine.bo "bridge" script (data-node-id tagging)
```

Routes are declared in `frontend/src/App.tsx`; the app uses
`react-router-dom`'s `BrowserRouter`, so the server needs SPA fallback (both
the Go `NoRoute` handler and `frontend/vercel.json` provide one).

## Build, run, and test commands

Frontend (from `frontend/`):

- `npm install` — install dependencies.
- `npm run dev` — Vite dev server on port 3000; proxies `/api` to
  `http://localhost:8080` (the local Go backend).
- `npm run build` — production build into `frontend/dist/`.
- `npm run lint` — **this is the type check** (`tsc --noEmit`); there is no
  ESLint config and **no frontend test setup** at all.
- `npm run clean` — removes `dist` and `server.js`.

Backend (from `backend/`):

- `go run ./cmd/server` — run the API (needs the env vars below).
- `go run ./cmd/migration` — run migrations manually (requires `DB_SCHEMA`).
- `go build ./...` — compile check.
- `go test ./...` — runs the test suite (currently only
  `internal/services/mailer_test.go`, covering email-template rendering and the
  missing-credentials error path).

## Code style and conventions

- **Go**: standard `gofmt` formatting; layered structure
  handler → services → repositary → model; handlers return errors through
  `internal/apperror` (`apperror.SendError`). Config comes only from
  environment variables — never hardcode DB hosts, schemas, or secrets
  (comments in `config/config.go` and `internal/db/db.go` stress this). The DB
  schema is always `DB_SCHEMA` via `search_path`, never `"public"`.
- **TypeScript/React**: function components, path alias `@/*` maps to the
  `frontend/` root (see `tsconfig.json` / `vite.config.ts`), styling via
  Tailwind utility classes (v4, imported through `src/index.css`).
- Keep changes minimal and match surrounding patterns; comments in this repo
  often explain *why* (e.g. the "ponytail" note in
  `backend/internal/middleware/ratelimiter.go` documenting that the in-memory
  fixed-window limiter is single-replica only).

## Testing

- Backend has one Go test file (`go test ./...` from `backend/`); add tests
  alongside the package under test when changing mailer/service behavior.
- The frontend has no test framework; verify changes with `npm run lint`
  (type check) and `npm run build`.

## Deployment

- **Backend** deploys to Railway (`backend/railway.toml`) via
  `backend/Dockerfile`: multi-stage Go 1.25 Alpine build compiles
  `cmd/migration` and `cmd/server`; `start.sh` runs migrations then starts the
  server. Healthcheck path is `/api/health`. The Go server embeds and serves
  the SPA from `internal/dist/` with an `index.html` fallback — note the
  committed `internal/dist/index.html` is a **placeholder** so `go:embed`
  compiles; in the real deploy the frontend is served separately.
- **Frontend** deploys to Vercel (`frontend/vercel.json` rewrites all paths to
  `/index.html`). `frontend/metadata.json` and parts of `index.html` are
  leftovers from the Google AI Studio scaffolding (same for the
  `GEMINI_API_KEY`/`APP_URL` entries in `frontend/.env.example` and unused deps
  like `@google/genai`, `express`, `nodemailer` in `package.json`) — don't
  assume they are functional features.

## Environment variables and security

- Backend (`backend/.env.example`): `DB_HOST`, `DB_PORT`, `DB_USER`,
  `DB_PASSWORD`, `DB_NAME`, `DB_SCHEMA`, `JWT_SECRET`, `PORT`, `ENV`, plus
  `GMAIL_USER` / `GMAIL_APP_PASSWORD` for email. If the Gmail vars are missing,
  the mailer returns an error (surfaced as a 500) **after** the row has already
  been persisted — donations/messages are never lost because email fails.
- Real secrets live in `.env` / `frontend/.env.local`; both are gitignored —
  never commit them.
- Security posture: CORS middleware, per-IP rate limiting (30 req/min) on the
  two POST endpoints, and a JWT `AuthMiddleware` that is written but **not yet
  wired to any route** (admin auth currently happens entirely in Supabase on
  the frontend — treat `/admin` as client-side-gated only).
