// Derives a condensed, human-readable summary of the weekly opening hours,
// grouping consecutive days that share the same schedule (e.g. "Mandag–søndag:
// 10:00–20:00"). Pure and unit-tested. Unlike getOpenStatus' dot format, this
// keeps the stored HH:mm colon format per Figma — do NOT touch getOpenStatus.

import type { DaySchedule, WeekSchedule } from './getOpenStatus'

export type WeekSummaryLine = { days: string; hours: string | null }

// Danish week order — no wrap-around across the Sunday/Monday boundary.
const DAY_ORDER = [
  'monday',
  'tuesday',
  'wednesday',
  'thursday',
  'friday',
  'saturday',
  'sunday',
] as const

const DEFAULT_LABELS: Record<(typeof DAY_ORDER)[number], string> = {
  monday: 'Mandag',
  tuesday: 'Tirsdag',
  wednesday: 'Onsdag',
  thursday: 'Torsdag',
  friday: 'Fredag',
  saturday: 'Lørdag',
  sunday: 'Søndag',
}

const TIME_PATTERN = /^([01]\d|2[0-3]):[0-5]\d$/

// The condensed hours string, or null when the day is closed or its times are
// missing/malformed (consumer renders "Lukket").
const hoursFor = (entry: DaySchedule): string | null => {
  if (entry.closed) return null
  const opensAt = entry.opensAt ?? ''
  const closesAt = entry.closesAt ?? ''
  if (!TIME_PATTERN.test(opensAt) || !TIME_PATTERN.test(closesAt)) return null
  return `${opensAt}–${closesAt}`
}

export const formatWeekSummary = (week: WeekSchedule | null | undefined): WeekSummaryLine[] => {
  if (!week) return []

  // Normalize into an ordered list, skipping days entirely absent from the data.
  const days = DAY_ORDER.flatMap((key) => {
    const entry = week[key]
    if (!entry) return []
    return [
      {
        label: entry.label || DEFAULT_LABELS[key],
        hours: hoursFor(entry),
        // Fingerprint drives grouping: identical (closed, opensAt, closesAt).
        fingerprint: `${Boolean(entry.closed)}|${entry.opensAt ?? ''}|${entry.closesAt ?? ''}`,
      },
    ]
  })

  if (days.length === 0) return []

  const lines: WeekSummaryLine[] = []
  let groupStart = 0

  const pushGroup = (start: number, end: number) => {
    const first = days[start]!
    const last = days[end]!
    const label = start === end ? first.label : `${first.label}–${last.label.toLowerCase()}`
    lines.push({ days: label, hours: first.hours })
  }

  for (let i = 1; i <= days.length; i++) {
    // Break the group when the schedule changes or the week ends. Consecutive
    // days only — non-adjacent identical days never merge.
    if (i === days.length || days[i]!.fingerprint !== days[groupStart]!.fingerprint) {
      pushGroup(groupStart, i - 1)
      groupStart = i
    }
  }

  return lines
}
