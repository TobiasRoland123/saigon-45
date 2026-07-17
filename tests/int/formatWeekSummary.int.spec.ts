import { describe, it, expect } from 'vitest'

import type { WeekSchedule } from '@/OpeningHours/getOpenStatus'
import { formatWeekSummary } from '@/OpeningHours/formatWeekSummary'

const openDay = (label: string, opensAt = '10:00', closesAt = '20:00') => ({
  label,
  closed: false,
  opensAt,
  closesAt,
})

const fullWeek = (): WeekSchedule => ({
  monday: openDay('Mandag'),
  tuesday: openDay('Tirsdag'),
  wednesday: openDay('Onsdag'),
  thursday: openDay('Torsdag'),
  friday: openDay('Fredag'),
  saturday: openDay('Lørdag'),
  sunday: openDay('Søndag'),
})

describe('formatWeekSummary', () => {
  it('collapses an identical week into a single range line', () => {
    expect(formatWeekSummary(fullWeek())).toEqual([{ days: 'Mandag–søndag', hours: '10:00–20:00' }])
  })

  it('splits out a Sunday that differs from the rest', () => {
    const week = fullWeek()
    week.sunday = openDay('Søndag', '10:00', '19:00')
    expect(formatWeekSummary(week)).toEqual([
      { days: 'Mandag–lørdag', hours: '10:00–20:00' },
      { days: 'Søndag', hours: '10:00–19:00' },
    ])
  })

  it('splits groups around a closed day mid-week', () => {
    const week = fullWeek()
    week.thursday = { ...openDay('Torsdag'), closed: true }
    expect(formatWeekSummary(week)).toEqual([
      { days: 'Mandag–onsdag', hours: '10:00–20:00' },
      { days: 'Torsdag', hours: null },
      { days: 'Fredag–søndag', hours: '10:00–20:00' },
    ])
  })

  it('renders a two-day group as a range', () => {
    const week = fullWeek()
    week.wednesday = openDay('Onsdag', '12:00', '18:00')
    week.thursday = openDay('Torsdag', '12:00', '18:00')
    week.friday = openDay('Fredag', '10:00', '20:00')
    expect(formatWeekSummary(week)).toEqual([
      { days: 'Mandag–tirsdag', hours: '10:00–20:00' },
      { days: 'Onsdag–torsdag', hours: '12:00–18:00' },
      { days: 'Fredag–søndag', hours: '10:00–20:00' },
    ])
  })

  it('does not merge non-consecutive days with identical hours', () => {
    const week = fullWeek()
    week.tuesday = openDay('Tirsdag', '12:00', '16:00')
    // Monday and Wednesday share hours but Tuesday interrupts them.
    const result = formatWeekSummary(week)
    expect(result[0]).toEqual({ days: 'Mandag', hours: '10:00–20:00' })
    expect(result[1]).toEqual({ days: 'Tirsdag', hours: '12:00–16:00' })
    expect(result[2]).toEqual({ days: 'Onsdag–søndag', hours: '10:00–20:00' })
  })

  it('renders overnight hours literally', () => {
    const week = fullWeek()
    for (const key of [
      'monday',
      'tuesday',
      'wednesday',
      'thursday',
      'friday',
      'saturday',
      'sunday',
    ] as const) {
      week[key] = openDay(week[key]!.label!, '18:00', '02:00')
    }
    expect(formatWeekSummary(week)).toEqual([{ days: 'Mandag–søndag', hours: '18:00–02:00' }])
  })

  it('treats malformed or missing times as closed', () => {
    const week = fullWeek()
    week.monday = { label: 'Mandag', closed: false, opensAt: '9:00', closesAt: '20:00' }
    week.tuesday = { label: 'Tirsdag', closed: false, opensAt: null, closesAt: '20:00' }
    const result = formatWeekSummary(week)
    expect(result[0]).toEqual({ days: 'Mandag', hours: null })
    expect(result[1]).toEqual({ days: 'Tirsdag', hours: null })
  })

  it('returns an empty array for a null, undefined or empty week', () => {
    expect(formatWeekSummary(null)).toEqual([])
    expect(formatWeekSummary(undefined)).toEqual([])
    expect(formatWeekSummary({})).toEqual([])
  })

  it('uses custom editor labels and falls back to the Danish default when missing', () => {
    const week: WeekSchedule = {
      monday: { closed: false, opensAt: '10:00', closesAt: '20:00' }, // no label → default
      tuesday: { label: 'Tirsdag særlig', closed: false, opensAt: '11:00', closesAt: '21:00' },
    }
    expect(formatWeekSummary(week)).toEqual([
      { days: 'Mandag', hours: '10:00–20:00' },
      { days: 'Tirsdag særlig', hours: '11:00–21:00' },
    ])
  })
})
