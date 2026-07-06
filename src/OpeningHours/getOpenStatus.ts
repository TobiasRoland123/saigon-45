// Pure, timezone-aware open/closed logic shared by the pill component.
// `day` values match Date.getDay(): 0 = Sunday ... 6 = Saturday.

export type DaySchedule = {
  day?: string | null
  closed?: boolean | null
  opensAt?: string | null // "HH:mm"
  closesAt?: string | null // "HH:mm"
  id?: string | null
}

export type OpenStatus = {
  isOpen: boolean
  label: string
}

const WEEKDAY_NAMES = ['SØNDAG', 'MANDAG', 'TIRSDAG', 'ONSDAG', 'TORSDAG', 'FREDAG', 'LØRDAG']

// "20:00" -> minutes since midnight, or null if unusable.
const toMinutes = (time?: string | null): number | null => {
  if (!time) return null
  const match = /^([01]\d|2[0-3]):([0-5]\d)$/.exec(time)
  if (!match) return null
  return Number(match[1]) * 60 + Number(match[2])
}

// minutes -> "20.00" (Danish-style dot separator).
const fmt = (minutes: number): string => {
  const m = ((minutes % 1440) + 1440) % 1440
  const h = Math.floor(m / 60)
  const min = m % 60
  return `${String(h).padStart(2, '0')}.${String(min).padStart(2, '0')}`
}

type Normalized = { open: number; close: number } | null

// Returns the day's open window in minutes, treating a closing time that is
// <= the opening time as crossing midnight (e.g. 18:00–02:00 -> close 26:00).
const windowFor = (entry?: DaySchedule): Normalized => {
  if (!entry || entry.closed) return null
  const open = toMinutes(entry.opensAt)
  const close = toMinutes(entry.closesAt)
  if (open === null || close === null) return null
  return { open, close: close <= open ? close + 1440 : close }
}

/**
 * Computes whether the venue is open at `now` and a human label.
 * @param days  Weekly schedule (any subset of the 7 days; missing = closed).
 * @param now   Current time already expressed in the venue's local timezone
 *              (see resolveNow in Component.client.tsx).
 */
export const getOpenStatus = (
  days: DaySchedule[] | null | undefined,
  now: { weekday: number; minutes: number },
): OpenStatus => {
  const byDay = new Map<number, DaySchedule>()
  for (const entry of days ?? []) {
    if (entry?.day != null) byDay.set(Number(entry.day), entry)
  }

  const today = now.weekday
  const yesterday = (today + 6) % 7

  // 1) Still inside yesterday's window that ran past midnight?
  const yWindow = windowFor(byDay.get(yesterday))
  if (yWindow && yWindow.close > 1440 && now.minutes < yWindow.close - 1440) {
    return { isOpen: true, label: `Åben indtil ${fmt(yWindow.close)}` }
  }

  // 2) Inside today's window?
  const tWindow = windowFor(byDay.get(today))
  if (tWindow && now.minutes >= tWindow.open && now.minutes < tWindow.close) {
    return { isOpen: true, label: `Åben indtil ${fmt(tWindow.close)}` }
  }

  // 3) Closed now — opening later today?
  if (tWindow && now.minutes < tWindow.open) {
    return { isOpen: false, label: `Lukket — Åbner igen klokken ${fmt(tWindow.open)}` }
  }

  // 4) Closed now — find the next day that opens.
  for (let offset = 1; offset <= 7; offset++) {
    const dayIndex = (today + offset) % 7
    const window = windowFor(byDay.get(dayIndex))
    if (!window) continue

    const when = offset === 1 ? 'i morgen' : `på ${WEEKDAY_NAMES[dayIndex]}`
    return { isOpen: false, label: `Lukket - Åbner igen ${when}, klokken ${fmt(window.open)}` }
  }

  // No hours configured at all.
  return { isOpen: false, label: 'Lukket' }
}
