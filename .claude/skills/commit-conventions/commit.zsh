#!/bin/zsh

set -e

# Require gum
if ! command -v gum >/dev/null 2>&1; then
  echo "gum is required but not found. Install gum and try again."
  exit 1
fi

export VISUAL="code --wait"
export EDITOR="$VISUAL"


color=39
color_error=160
export GUM_CHOOSE_CURSOR_FOREGROUND=$color
export GUM_CHOOSE_SELECTED_FOREGROUND=$color
export GUM_CHOOSE_SELECTED_BORDER_FOREGROUND=$color

export GUM_INPUT_CURSOR_FOREGROUND=$color
export GUM_INPUT_PROMPT_FOREGROUND=$color

export GUM_WRITE_CURSOR_FOREGROUND=$color
export GUM_WRITE_PROMPT_FOREGROUND=$color
export GUM_WRITE_HEADER_FOREGROUND=$color

export GUM_CONFIRM_PROMPT_FOREGROUND=$color
export GUM_CONFIRM_SELECTED_FOREGROUND=0
export GUM_CONFIRM_SELECTED_BACKGROUND=$color

scope_header_color=$color

# Ensure we're in a git repo
if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "Not a git repository."
  exit 1
fi

# Ensure there are staged changes
if git diff --cached --quiet; then
  echo "No staged changes to commit."
  exit 1
fi

type_selection=""
scope_value=""
message_value=""
description_value=""

# Build prefix with a scoped loop (must leave room for subject)
limit=65

while true; do

  # Choose type
  local -a type_selected_args
  if [[ -n "$type_selection" ]]; then
    type_selected_args=(--selected "$type_selection")
  fi

  type_selection=$(gum choose \
    "feat      — A new feature" \
    "fix       — A bug fix" \
    "refactor  — Restructure code without changing behavior" \
    "style     — Formatting, whitespace, semicolons, etc." \
    "docs      — Documentation only" \
    "test      — Add or update tests" \
    "perf      — Improve performance" \
    "build     — Build system or dependencies" \
    "ci        — CI/CD pipeline and config" \
    "chore     — Maintenance and tooling" \
    "revert    — Revert a previous commit" \
    --cursor "➤ " \
    "${type_selected_args[@]}" \
  )
  # Strip description, keep only the type keyword
  type="${type_selection%% *}"
  if [[ -z "$type" ]]; then
    echo "No type selected. Aborting."
    exit 1
  fi


  # Scope loop with dynamic header and length validation

  # Preview how many chars are left for the subject if scope is empty
  empty_prefix="${type}:"
  empty_avail=$(( limit - 1 - ${#empty_prefix} ))
  [[ $empty_avail -lt 0 ]] && empty_avail=0

  scope_header="Optional scope (leave empty if none).
  If no scope is provided, you have ${empty_avail} chars for the subject.
  A single word is recommended, but you can use hyphens."

  while true; do

    scope=$(
      gum input \
        --header.foreground $scope_header_color \
        --placeholder "e.g. send-outs, archive or contacts" \
        --header "$scope_header" \
        --value="$scope_value"
    )

    # Trim whitespace
    scope="${scope##[[:space:]]#}"
    scope="${scope%%[[:space:]]#}"

    # Candidate prefix incl. colon
    if [[ -n "$scope" ]]; then
      candidate_prefix="${type}(${scope}):"
    else
      candidate_prefix="${type}:"
    fi

    # Must leave at least 1 char for subject (prefix + space + 1 < limit)
    if (( ${#candidate_prefix} + 1 < limit )); then
      prefix="$candidate_prefix"

      scope_value="$scope"  # Save for next time
      break
    fi

    # Too long -> show error and keep previous value for editing
    scope_value="$scope"
    scope_header="Scope too long for 55-char rule. Current prefix is ${#candidate_prefix} chars; must leave ≥1 char for subject."
    scope_header_color=196
  done

  # Subject loop with dynamic header and total length validation
  avail=$(( limit - 1 - ${#prefix} ))
  header="You have ${avail} chars for the subject (total ≤ ${limit} incl. prefix)."
  header_color=$color

  while true; do
    subject=$(
      gum input \
        --header.foreground $header_color \
        --prompt "When applied, this commit will " \
        --placeholder "Commit message" \
        --header "$header" \
        --value="$message_value"
    )

    # Trim whitespace
    subject="${subject##[[:space:]]#}"
    subject="${subject%%[[:space:]]#}"

    if [[ -z "$subject" ]]; then
      header="Subject is required."
      header_color=196
      continue
    fi

    total_len=$(( ${#prefix} + 1 + ${#subject} ))  # +1 for the space
    message_value="$subject"  # Save for next time
    if (( total_len <= limit )); then
      # Capitalise first letter (zsh)
      subject="${(U)${subject[1]}}${subject[2,-1]}"

      break
    fi

    header="Too long: ${total_len} chars (max < ${limit}). Subject must be ≤ ${avail}."
    header_color=196
  done

  # Optional description (multiline, wrapped at 72 chars)
  description=$(gum write \
    --end-of-buffer.foreground "39" \
    --placeholder "(Enter to finish)" \
    --header "Optional description. Leave empty if none." \
    --width 50 \
    --value="$description_value" \
  )

  if [[ -n "$description" ]]; then
    description=$(echo "$description" | fold -s -w 72)
  fi

  description_value="$description"  # Save for next time

  # Summary + confirm
  gum style --foreground $color --bold "Prefix:"
  echo "  $prefix"
  gum style --foreground $color --bold "Subject:"
  echo "  $subject"
  if [[ -n "$description" ]]; then
    gum style --foreground $color --bold "Description:"
    echo "$description" | sed 's/^/  /'
  fi
  gum style --foreground $color --bold "Files:"
  git diff --cached --name-only | sed 's/^/  - /'
  echo

  if gum confirm "Commit these changes?"; then
    if [[ -n "$description" ]]; then
      # Commit (separate -m for subject/body)
      git commit -m "$prefix $subject" -m "$description" --quiet
    else
      git commit -m "$prefix $subject" --quiet
    fi
    gum style --foreground $color --bold "Changes committed"
    exit 0
  else

    # If interrupted (e.g. Ctrl-C), exit with 130
    rc=$? # 1 = No, 130 = SIGINT
    if [ $rc -eq 130 ]; then
      echo "Aborted."
      exit 130
    fi

    if gum confirm "Start over?"; then
      :
    else
      echo "Aborted."
      exit 0
    fi

    # clear lines
    total_lines=0
    total_lines=$((total_lines + 2)) # Prefix (type + scope) + header
    total_lines=$((total_lines + 2)) # Subject + header

    if [[ -n "$description" ]]; then
      desc_lines=$(echo "$description" | wc -l)
      total_lines=$((total_lines + desc_lines + 1)) # Description + header
    fi

    file_count=$(git diff --cached --name-only | wc -l)
    total_lines=$((total_lines + file_count + 1)) # Files + header
    total_lines=$((total_lines + 1)) # Confirm prompt

    # Move cursor up and clear lines
    for ((i=0; i<$total_lines; i++)); do
      tput cuu1
      tput el
    done
  fi
done
