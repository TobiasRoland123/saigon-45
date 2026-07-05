# CLAUDE.md

Guidance for Claude Code when working in this repository. This is the Claude Code
equivalent of [`AGENTS.md`](./AGENTS.md); both should be kept roughly in sync.

## Project

Saigon 45 — a website built on **Payload CMS 3** with **Next.js 16** (App Router),
**React 19**, and **Tailwind CSS 4**. Database is Postgres (Neon/Vercel Postgres) and
media is stored in Vercel Blob.

## How to run the project

We use **pnpm** in this project:

- `pnpm install && pnpm dev` — install dependencies and start the dev server (http://localhost:3000)

First-time setup (env vars, Neon/Docker database) is documented in
[getStarted.md](./getStarted.md). Copy `.env.example` to `.env` and fill in
`POSTGRES_URL` and `BLOB_READ_WRITE_TOKEN` before running.

### Common commands

- `pnpm dev` — start the dev server
- `pnpm build` — production build (runs `next build`)
- `pnpm lint` / `pnpm lint:fix` — ESLint
- `pnpm test` — run all tests (integration + e2e)
- `pnpm test:int` — Vitest integration tests
- `pnpm test:e2e` — Playwright end-to-end tests
- `pnpm generate:types` — regenerate Payload types
- `pnpm payload` — Payload CLI

## Skills

Reusable skills for Claude Code live in [`.claude/skills/`](./.claude/skills). Each skill
is a `SKILL.md` (with supporting files) that Claude Code discovers automatically:

- **openspec** — OpenSpec artifact-driven workflow (OPSX commands, schemas, project config)
- **vercel-react-best-practices** — React/Next.js performance guidelines from Vercel Engineering
- **useeffect-audit** — audit and refactor React Effects using official React guidance
- **agent-browser** — browser automation CLI for interacting with and testing web apps
- **grill-with-docs** — a relentless interview to sharpen a plan or design while producing ADRs and a glossary

These mirror the skills under `.agents/skills/`, which remain in place for other tools.

## Docs

Docs live in [./docs](./docs) and should be followed by both agents and developers:

- [git.md](docs/git.md) — git rules for this project (branch naming, issues, PRs)
- [icons.md](docs/icons.md) — project-wide icon strategy (controlled `lucide-react` registry)

See also [DESIGN.md](./DESIGN.md) for the design tokens / color system and
[getStarted.md](./getStarted.md) for local development setup.

## Conventions

- Application code lives in `./src`; changes there are hot-reloaded by `pnpm dev`.
- Icons go through the shared registry — see [docs/icons.md](docs/icons.md); do not import
  `lucide-react` icons ad hoc.
- Follow the branch-naming and issue conventions in [docs/git.md](docs/git.md)
  (e.g. `feat/`, `fix/`, `chore/` prefixes).
