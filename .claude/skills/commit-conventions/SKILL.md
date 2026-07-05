---
name: commit-conventions
description: How to write git commit messages in the Saigon 45 repo. This project follows Conventional Commits — `type(scope): Subject` with an imperative, capitalized subject on a header line of at most 65 characters, and an optional body wrapped at 72 characters. Use this whenever writing a commit message or running `git commit` in this repository. Mirrors the interactive `gum` helper in `commit.zsh`.
---

# Commit conventions

This repo follows **Conventional Commits**. Commits are normally created through the
interactive `gum` helper bundled here as [`commit.zsh`](./commit.zsh) — that script is the
source of truth for these rules. Write every commit to match its output.

## Format

```
type(scope): Subject

Optional body, wrapped at 72 characters.
```

- Scope is optional. Without it the header is just `type: Subject`.
- Exactly one space after the colon.
- A blank line separates the subject from the body.

## Types

Pick the type that best describes the change:

| Type       | When to use                                        |
| ---------- | -------------------------------------------------- |
| `feat`     | A new feature                                      |
| `fix`      | A bug fix                                           |
| `refactor` | Restructure code without changing behavior         |
| `style`    | Formatting, whitespace, semicolons, etc.           |
| `docs`     | Documentation only                                 |
| `test`     | Add or update tests                                |
| `perf`     | Improve performance                                |
| `build`    | Build system or dependencies                       |
| `ci`       | CI/CD pipeline and config                          |
| `chore`    | Maintenance and tooling                            |
| `revert`   | Revert a previous commit                           |

## Scope

- Optional. A single word is recommended; hyphens are allowed (e.g. `send-outs`, `archive`, `contacts`).
- Describes the area of the codebase the change touches.

## Subject

- **Imperative mood.** The subject must complete the sentence
  *"When applied, this commit will …"* — e.g. "…**add a dark mode toggle**".
- **Capitalize the first letter** of the subject: `Add a dark mode toggle`.
- **No trailing period.**
- **Length:** the whole header line (`type(scope): Subject`, including the type, scope,
  colon, and space) must be **≤ 65 characters**. Keep scopes short so the subject has room.
- Required — a commit must always have a subject.

## Body

- Optional. Use it to explain **what** and **why**, not how.
- Leave a blank line after the subject, then wrap the body at **72 characters**.

## Examples

```
feat(auth): Add password reset flow
```

```
fix: Prevent crash when contact list is empty
```

```
refactor(archive): Extract filtering into a shared hook

The archive and send-outs views both duplicated the same filtering
logic. Pull it into useArchiveFilters so both stay in sync and the
behavior is covered by a single set of tests.
```

## Creating the commit

Humans run the interactive helper (`commit.zsh`, which uses [`gum`](https://github.com/charmbracelet/gum))
to build and validate the message against these rules. When creating commits programmatically,
produce the same result directly, e.g.:

```sh
git commit -m "feat(auth): Add password reset flow" -m "Optional body wrapped at 72 chars…"
```
