'use client'

import React, { useSyncExternalStore } from 'react'

import { Icon } from '@/components/icons'
import { cn } from '@/utilities/ui'
import { getOpenStatus, type WeekSchedule } from './getOpenStatus'
import Link from 'next/link'

const VENUE_TIME_ZONE = 'Europe/Copenhagen'

const WEEKDAY_NAME_TO_INDEX: Record<string, number> = {
  Sun: 0,
  Mon: 1,
  Tue: 2,
  Wed: 3,
  Thu: 4,
  Fri: 5,
  Sat: 6,
}

/**
 * Reads the current moment in the venue's timezone and encodes it as a single
 * number: `weekday * 1440 + minutesSinceMidnight` (weekday 0 = Sunday … 6 = Saturday).
 *
 * We return one primitive (rather than an object) so `useSyncExternalStore` can
 * cheaply tell whether the value changed — a fresh object every call would make
 * it re-render forever.
 */
function getVenueMinuteOfWeek(): number {
  const dateParts = new Intl.DateTimeFormat('en-US', {
    timeZone: VENUE_TIME_ZONE,
    weekday: 'short',
    hour: '2-digit',
    minute: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(new Date())

  const getPart = (type: string) => dateParts.find((part) => part.type === type)?.value ?? ''

  const weekdayIndex = WEEKDAY_NAME_TO_INDEX[getPart('weekday')] ?? 0
  const minutesSinceMidnight = Number(getPart('hour')) * 60 + Number(getPart('minute'))

  return weekdayIndex * 1440 + minutesSinceMidnight
}

/** Re-runs the snapshot every minute so the open/closed label stays fresh. */
function subscribeToMinuteTick(onTick: () => void): () => void {
  const intervalId = setInterval(onTick, 60_000)
  return () => clearInterval(intervalId)
}

/**
 * On the server (and the first hydration render) we have no reliable "now", so
 * we return `null` and render the pill without a status. React then swaps in the
 * real client value after mount — no hydration mismatch, no setState-in-effect.
 */
function getServerMinuteOfWeek(): number | null {
  return null
}

type Props = {
  address: string
  addressUrl: string
  days: WeekSchedule | null | undefined
  className?: string
}

export const OpeningHoursPill: React.FC<Props> = ({ address, addressUrl, days, className }) => {
  const venueMinuteOfWeek = useSyncExternalStore<number | null>(
    subscribeToMinuteTick,
    getVenueMinuteOfWeek,
    getServerMinuteOfWeek,
  )

  const currentTime =
    venueMinuteOfWeek === null
      ? null
      : { weekday: Math.floor(venueMinuteOfWeek / 1440), minutes: venueMinuteOfWeek % 1440 }

  const openStatus = currentTime ? getOpenStatus(days, currentTime) : null

  return (
    <div
      className={cn(
        'flex w-full max-w-full flex-col items-stretch rounded-2xl bg-[#6b7159] px-4 py-3 text-xs text-white shadow-lg sm:inline-flex sm:w-auto sm:flex-row sm:items-center sm:gap-3 sm:rounded-full sm:py-3 sm:pr-6 sm:pl-5',
        className,
      )}
    >
      <span className="flex min-w-0 items-center gap-2">
        <Icon name="mapPin" className="size-5 shrink-0 text-(--color-primary-fixed)" />
        <Link
          className="min-w-0 flex-1 sm:flex-none"
          href={addressUrl}
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="font-medium wrap-break-word sm:truncate">{address}</span>
        </Link>
      </span>

      <span aria-hidden className="my-3 h-px w-full bg-white/25 sm:my-0 sm:h-6 sm:w-px" />

      <span className="flex min-w-0 items-center gap-2 sm:flex-none">
        <Icon name="clock" className="size-5 shrink-0 text-(--color-primary-fixed)" />
        {openStatus && (
          <span className="flex items-center gap-2">
            <span
              className={cn(
                'size-2 shrink-0 animate-pulse rounded-full',
                openStatus.isOpen ? 'bg-green-400' : 'bg-red-400',
              )}
            />
            <span className="font-semibold tracking-wide wrap-break-word whitespace-normal sm:whitespace-nowrap">
              {openStatus.label}
            </span>
          </span>
        )}
      </span>
    </div>
  )
}
