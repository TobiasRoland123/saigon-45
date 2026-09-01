## How to run the project

We are using pnpm in this project:

- `pnpm install && pnpm dev` to install dependencies and start the dev server

## Pre-commit checks

`.husky/pre-commit` is the only automated gate in this repo — nothing runs lint or tests in
CI. It runs `pnpm lint-staged`, then `fallow audit`.

Agents must run the audit themselves before handing work back. The hook skips it when
`fallow` is missing from `PATH`, which is usually the case in a non-interactive agent shell
but not in a developer's terminal — so it passes silently for the agent and then fails for
the human:

```sh
BASE="$(git merge-base "$(git rev-parse --abbrev-ref --symbolic-full-name '@{upstream}' 2>/dev/null)" HEAD 2>/dev/null || echo main)"
./node_modules/.bin/fallow audit --base "$BASE" --quiet --gate-marker pre-commit
```

The report is long, but the gate is `new-only` — only issues your own diff introduced fail
it. Re-run with `--format json` and check the `attribution` block: act on
`*_introduced`, ignore `*_inherited`. See [CLAUDE.md](./CLAUDE.md) for the full notes.

## Docs

Docs are placed in [./docs](./docs).
Docs holds documentation for different areas of the project., which should be followed by both agents and developers.

### Table of contents

- [git.md](docs/git.md) This is a guide to git related rules in this project
- [icons.md](docs/icons.md) Project-wide icon strategy and implementation guidance
- [styling.md](docs/styling.md) Use `cn` for conditional and dynamic Tailwind class composition
