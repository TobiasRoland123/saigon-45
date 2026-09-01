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

## Pre-commit checks

`.husky/pre-commit` is the only automated gate in this repo — nothing runs lint or tests
in CI — so it has to pass before any commit lands. It runs two things:

1. `pnpm lint-staged` — ESLint `--fix` and Prettier over staged files.
2. `fallow audit --base <upstream-or-main> --quiet --gate-marker pre-commit`.

**Agents must run step 2 themselves before handing work back.** The hook starts with
`command -v fallow >/dev/null 2>&1 || exit 0`, and `fallow` is normally on a developer's
interactive PATH but _not_ on an agent's non-interactive one — so the gate silently skips
for the agent and then fails for the human, who ends up pasting the error back. Run it
through the local binary instead:

```sh
BASE="$(git merge-base "$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' 2>/dev/null)" HEAD 2>/dev/null || echo main)"
./node_modules/.bin/fallow audit --base "$BASE" --quiet --gate-marker pre-commit
```

### Reading the output

The audit prints a long report — unused dependencies, circular imports, CSS token drift,
complexity. **Most of it is pre-existing and does not block.** The gate is `new-only`: it
fails only on what your own diff introduced. To see what actually blocks, re-run with
`--format json` and read the `attribution` block:

- `complexity_introduced` / `dead_code_introduced` above `0` — yours, and the reason for
  the non-zero exit. Fix it.
- `*_inherited` — existing debt. Leave it alone, and do not report it as a finding of the
  current task.

Fix an introduced complexity finding by simplifying the code — usually by splitting one
function into smaller named pieces — rather than reaching for
`// fallow-ignore-next-line complexity`.

Two things that surprise people:

- `--base` is the branch's _upstream_, so the audit covers every uncommitted change, not
  just the one being committed. When splitting work across several commits, expect the
  same report on each one until the branch is pushed.
- A failure here does not lose work. `lint-staged` stashes and restores cleanly, so the
  working tree and the index survive a rejected commit.

## Skills

Reusable skills for Claude Code live in [`.claude/skills/`](./.claude/skills). Each skill
is a `SKILL.md` (with supporting files) that Claude Code discovers automatically:

- **openspec** — OpenSpec artifact-driven workflow (OPSX commands, schemas, project config)
- **vercel-react-best-practices** — React/Next.js performance guidelines from Vercel Engineering
- **useeffect-audit** — audit and refactor React Effects using official React guidance
- **agent-browser** — browser automation CLI for interacting with and testing web apps
- **grill-with-docs** — a relentless interview to sharpen a plan or design while producing ADRs and a glossary
- **commit-conventions** — the repo's Conventional Commits style for git commit messages (mirrors the `gum` helper)

The first five mirror the skills under `.agents/skills/`, which remain in place for other tools;
`commit-conventions` is Claude Code–specific.

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
