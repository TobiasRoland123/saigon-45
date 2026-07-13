import { describe, it, expect } from 'vitest'

import type { WeekSchedule } from '@/OpeningHours/getOpenStatus'
import { getOpenStatus } from '@/OpeningHours/getOpenStatus'

// Weekday indices follow Date.getDay(): 0 = Sunday ... 6 = Saturday.
const MONDAY = 1
const TUESDAY = 2
const SATURDAY = 6
const SUNDAY = 0

const at = (weekday: number, hours: number, minutes = 0) => ({
  weekday,
  minutes: hours * 60 + minutes,
})

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

describe('getOpenStatus', () => {
  it('is open inside today’s window', () => {
    const status = getOpenStatus(fullWeek(), at(MONDAY, 12))
    expect(status).toEqual({ isOpen: true, label: 'Åben indtil 20.00' })
  })

  it('stays open inside yesterday’s window that runs past midnight', () => {
    const week = fullWeek()
    week.saturday = openDay('Lørdag', '18:00', '02:00')
    const status = getOpenStatus(week, at(SUNDAY, 1))
    expect(status).toEqual({ isOpen: true, label: 'Åben indtil 02.00' })
  })

  it('is closed before opening time but opens later today', () => {
    const status = getOpenStatus(fullWeek(), at(MONDAY, 8))
    expect(status).toEqual({ isOpen: false, label: 'Lukket — Åbner igen klokken 10.00' })
  })

  it('is closed after closing time and opens tomorrow', () => {
    const status = getOpenStatus(fullWeek(), at(MONDAY, 21))
    expect(status).toEqual({ isOpen: false, label: 'Lukket - Åbner igen i morgen, klokken 10.00' })
  })

  it('skips closed days and uses the editor-provided label for the next open day', () => {
    const week = fullWeek()
    week.wednesday = { ...openDay('Onsdag'), closed: true }
    week.thursday = { ...openDay('Torsdag'), closed: true }
    const status = getOpenStatus(week, at(TUESDAY, 21))
    expect(status).toEqual({ isOpen: false, label: 'Lukket - Åbner igen på Fredag, klokken 10.00' })
  })

  it('is closed all day when the day is marked closed', () => {
    const week = fullWeek()
    week.saturday = { ...openDay('Lørdag'), closed: true }
    const status = getOpenStatus(week, at(SATURDAY, 12))
    expect(status.isOpen).toBe(false)
  })

  it('reports plain "Lukket" when no schedule exists', () => {
    expect(getOpenStatus(null, at(MONDAY, 12))).toEqual({ isOpen: false, label: 'Lukket' })
    expect(getOpenStatus({}, at(MONDAY, 12))).toEqual({ isOpen: false, label: 'Lukket' })
  })
})
