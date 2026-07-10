'use client'

import type { ReviewsBlock as ReviewsBlockProps } from '@/payload-types'
import { Icon } from '@/components/icons'
import React, { useState } from 'react'
import { cn } from '@/utilities/ui'

const DEFAULT_RATING = 4.5
const MAX_STARS = 5
const SWIPE_THRESHOLD = 48

type ReviewNavigationButtonProps = {
  direction: 'left' | 'right'
  onClick: () => void
}

type Review = NonNullable<ReviewsBlockProps['reviews']>[number]

type ReviewCardProps = {
  review: Review
  index: number
  isVisible: boolean
  isActive: boolean
  offset: number
  isDragging: boolean
  transform: string
  rating: number
}

const ReviewNavigationButton: React.FC<ReviewNavigationButtonProps> = ({ direction, onClick }) => {
  const isPrevious = direction === 'left'

  return (
    <button
      type="button"
      aria-label={isPrevious ? 'Forrige anmeldelse' : 'Næste anmeldelse'}
      onClick={onClick}
      className="grid size-10 place-items-center rounded-full border border-primary-muted/40 text-primary-fixed transition-colors hover:bg-primary/20"
    >
      <Icon name={isPrevious ? 'arrowLeft' : 'arrowRight'} />
    </button>
  )
}

const ReviewCard: React.FC<ReviewCardProps> = ({
  review,
  index,
  isVisible,
  isActive,
  offset,
  isDragging,
  transform,
  rating,
}) => {
  const visibilityClass = isActive
    ? 'z-30 opacity-100'
    : offset === 1
      ? 'z-20 opacity-100'
      : offset === 2
        ? 'z-10 opacity-100'
        : 'invisible opacity-0'

  return (
    <article
      className={`absolute inset-x-0 top-0 rounded-[1.75rem] border border-surface-dim/15 bg-inverse-surface p-8 shadow-2xl shadow-black/25 transition-[transform,opacity] duration-500 ease-out md:p-10 ${isVisible ? 'pointer-events-auto' : 'pointer-events-none'} ${visibilityClass} ${isDragging ? 'duration-0' : ''}`}
      style={{ transform }}
    >
      <div className="flex gap-1 text-primary" aria-label={`${rating} ud af ${MAX_STARS} stjerner`}>
        {Array.from({ length: MAX_STARS }).map((_, starIndex) => (
          <Icon
            key={starIndex}
            name="star"
            className={cn(
              `size-2.5 fill-current`,
              starIndex + 1 > Math.round(rating) ? 'opacity-30' : '',
            )}
          />
        ))}
      </div>
      <blockquote className="mt-8 max-w-136 text-lg leading-relaxed text-inverse-on-surface/90 italic">
        &quot;{review.quote}&quot;
      </blockquote>
      <div className="mt-12 border-t border-surface-dim/15 pt-8">
        <p className="text-sm font-semibold text-inverse-primary">{review.name}</p>
        {review.source && (
          <p className="mt-1 text-[10px] tracking-[0.16em] text-surface-dim/65 uppercase">
            {review.source}
          </p>
        )}
      </div>
      <span
        aria-hidden="true"
        className="absolute right-8 bottom-8 text-6xl leading-none font-extrabold text-primary/35"
      >
        &quot;
      </span>
    </article>
  )
}

export const ReviewsBlock: React.FC<ReviewsBlockProps> = ({
  eyebrow = 'Kvalitet du kan smage',
  ratingLabel = '4.5+ Stjerner på Google',
  ratingDescription = 'Vores gæster elsker vores mad og hurtige service.',
  ratingIcon = 'star',
  smileyTitle = 'Elite Smiley',
  smileyIcon = 'badgeCheck',
  smileyLinkLabel = 'Se vores seneste Smiley-rapport her.',
  smileyLinkUrl,
  reviews,
}) => {
  const visibleReviews = reviews?.filter((review) => review.quote && review.name) || []
  const [activeIndex, setActiveIndex] = useState(0)
  const [pointerStart, setPointerStart] = useState<number | null>(null)
  const [dragX, setDragX] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  if (!eyebrow && !visibleReviews.length && !ratingLabel && !smileyTitle) return null

  const animateTo = (direction: 1 | -1) => {
    if (isAnimating || visibleReviews.length < 2) return

    setIsAnimating(true)
    setDragX(direction * 520)

    window.setTimeout(() => {
      setActiveIndex((index) =>
        direction === 1
          ? (index + 1) % visibleReviews.length
          : (index - 1 + visibleReviews.length) % visibleReviews.length,
      )
      setDragX(0)
      setIsAnimating(false)
    }, 360)
  }

  const showNext = () => animateTo(1)
  const showPrevious = () => animateTo(-1)

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    if (isAnimating) return
    setPointerStart(event.clientX)
    event.currentTarget.setPointerCapture(event.pointerId)
  }

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStart === null) return
    setDragX(event.clientX - pointerStart)
  }

  const handlePointerUp = (event: React.PointerEvent<HTMLDivElement>) => {
    if (pointerStart === null) return
    const distance = event.clientX - pointerStart
    setPointerStart(null)
    if (Math.abs(distance) < SWIPE_THRESHOLD || visibleReviews.length < 2) {
      setDragX(0)
      return
    }
    setActiveIndex((index) =>
      distance < 0
        ? (index + 1) % visibleReviews.length
        : (index - 1 + visibleReviews.length) % visibleReviews.length,
    )
    setDragX(0)
  }

  const handlePointerCancel = () => {
    setPointerStart(null)
    setDragX(0)
  }

  return (
    <section className="bg-background py-8 text-primary-foreground md:py-12">
      <div className="container">
        <div className="relative overflow-hidden rounded-4xl bg-on-primary-fixed px-6 py-12 shadow-2xl shadow-black/35 md:rounded-[2.75rem] md:px-16 md:py-20 lg:px-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,color-mix(in_srgb,var(--color-primary-muted)_16%,transparent),transparent_32%),radial-gradient(circle_at_82%_24%,color-mix(in_srgb,var(--color-primary)_22%,transparent),transparent_35%)]" />
          <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              {eyebrow && (
                <h2 className="max-w-2xl text-5xl leading-[1.05] font-extrabold tracking-normal text-primary-fixed">
                  {eyebrow}
                </h2>
              )}

              <div className="mt-10 space-y-8 md:mt-16">
                {(ratingLabel || ratingDescription) && (
                  <div className="flex gap-5">
                    <div className="grid size-14 shrink-0 place-items-center rounded-full border border-primary/35 bg-on-primary-container text-primary-container md:size-16">
                      <Icon name={ratingIcon} className="size-7" />
                    </div>
                    <div>
                      {ratingLabel && (
                        <p className="text-2xl leading-tight font-bold text-primary-fixed">
                          {ratingLabel}
                        </p>
                      )}
                      {ratingDescription && (
                        <p className="mt-2 max-w-md text-base leading-relaxed text-surface-dim/80">
                          {ratingDescription}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(smileyTitle || smileyLinkLabel) && (
                  <div className="flex gap-5">
                    <div className="grid size-14 shrink-0 place-items-center rounded-full border border-secondary/35 bg-on-secondary-container text-secondary-container md:size-16">
                      <Icon name={smileyIcon} className="size-7" />
                    </div>
                    <div>
                      {smileyTitle && (
                        <p className="text-2xl leading-tight font-bold text-primary-fixed">
                          {smileyTitle}
                        </p>
                      )}
                      {smileyLinkLabel &&
                        (smileyLinkUrl ? (
                          <a
                            className="mt-2 inline-block text-base text-inverse-primary underline decoration-inverse-primary/45 underline-offset-4 hover:text-tertiary-fixed md:text-lg"
                            href={smileyLinkUrl}
                          >
                            {smileyLinkLabel}
                          </a>
                        ) : (
                          <p className="mt-2 text-base text-inverse-primary underline decoration-inverse-primary/45 underline-offset-4">
                            {smileyLinkLabel}
                          </p>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
            {visibleReviews.length > 0 && (
              <div className="relative lg:ml-auto lg:w-full lg:max-w-184">
                <div
                  className="relative min-h-96 touch-pan-y select-none"
                  onKeyDown={(event) => {
                    if (event.key === 'ArrowRight') showNext()
                    if (event.key === 'ArrowLeft') showPrevious()
                  }}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerCancel}
                  role="region"
                  aria-label="Kundeanmeldelser"
                  tabIndex={0}
                >
                  {visibleReviews.map((review, index) => {
                    const offset =
                      (index - activeIndex + visibleReviews.length) % visibleReviews.length
                    const isVisible = offset < 3
                    const rating = review.rating || DEFAULT_RATING
                    const isActive = offset === 0
                    const revealProgress = Math.min(Math.abs(dragX) / 180, 1)
                    const transform = isActive
                      ? `translateX(${dragX}px) rotate(${dragX / 18}deg)`
                      : `translate(${offset * 12 + (dragX < 0 ? -1 : 1) * revealProgress * offset * 4}px, ${offset * 24 - revealProgress * offset * 6}px) rotate(${offset * 2}deg) scale(${1 - offset * 0.035 + revealProgress * 0.035})`
                    return (
                      <ReviewCard
                        key={review.id || `${review.name}-${index}`}
                        review={review}
                        index={index}
                        isVisible={isVisible}
                        isActive={isActive}
                        offset={offset}
                        isDragging={pointerStart !== null}
                        transform={transform}
                        rating={rating}
                      />
                    )
                  })}
                </div>
                {visibleReviews.length > 1 && (
                  <div className="relative z-40 mt-6 flex items-center justify-between">
                    <p className="text-sm text-surface-dim" aria-live="polite">
                      {activeIndex + 1} / {visibleReviews.length}
                    </p>
                    <div className="flex gap-2">
                      <ReviewNavigationButton direction="left" onClick={showPrevious} />
                      <ReviewNavigationButton direction="right" onClick={showNext} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
