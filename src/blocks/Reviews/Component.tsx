import type { ReviewsBlock as ReviewsBlockProps } from '@/payload-types'
import { Icon } from '@/components/icons'
import React from 'react'

const DEFAULT_RATING = 4.5
const MAX_STARS = 5

export const ReviewsBlock: React.FC<ReviewsBlockProps> = ({
  eyebrow = 'Kvalitet du kan smage',
  ratingLabel = '4.5+ Stjerner på Google',
  ratingDescription = 'Vores gæster elsker vores mad og hurtige service.',
  smileyTitle = 'Elite Smiley',
  smileyLinkLabel = 'Se vores seneste Smiley-rapport her.',
  smileyLinkUrl,
  reviews,
}) => {
  const visibleReviews = reviews?.filter((review) => review.quote && review.name) || []
  const featuredReview = visibleReviews[0]
  const featuredRating = featuredReview?.rating || DEFAULT_RATING

  if (!eyebrow && !featuredReview && !ratingLabel && !smileyTitle) return null

  return (
    <section className="bg-background py-8 text-primary-foreground md:py-12">
      <div className="container">
        <div className="relative overflow-hidden rounded-4xl bg-[#0b2924] px-6 py-12 shadow-2xl shadow-black/35 md:rounded-[2.75rem] md:px-16 md:py-20 lg:px-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_18%_50%,rgba(151,180,173,0.16),transparent_32%),radial-gradient(circle_at_82%_24%,rgba(47,104,90,0.22),transparent_35%)]" />
          <div className="relative grid gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:items-center">
            <div>
              {eyebrow && (
                <h2 className="max-w-2xl text-5xl leading-[1.05] font-extrabold tracking-normal text-[#e9fef8]">
                  {eyebrow}
                </h2>
              )}

              <div className="mt-10 space-y-8 md:mt-16">
                {(ratingLabel || ratingDescription) && (
                  <div className="flex gap-5">
                    <div className="grid size-14 shrink-0 place-items-center rounded-full border border-[#2f685a]/35 bg-[#143832] text-[#4b9a87] md:size-16">
                      <Icon name="star" className="size-7 fill-current" />
                    </div>
                    <div>
                      {ratingLabel && (
                        <p className="text-2xl leading-tight font-bold text-[#e9fef8]">
                          {ratingLabel}
                        </p>
                      )}
                      {ratingDescription && (
                        <p className="mt-2 max-w-md text-base leading-relaxed text-[#caded9]/80">
                          {ratingDescription}
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {(smileyTitle || smileyLinkLabel) && (
                  <div className="flex gap-5">
                    <div className="grid size-14 shrink-0 place-items-center rounded-full border border-[#8e4e14]/35 bg-[#273525] text-[#b65d0f] md:size-16">
                      <Icon name="badgeCheck" className="size-7 fill-current" />
                    </div>
                    <div>
                      {smileyTitle && (
                        <p className="text-2xl leading-tight font-bold text-[#e9fef8]">
                          {smileyTitle}
                        </p>
                      )}
                      {smileyLinkLabel &&
                        (smileyLinkUrl ? (
                          <a
                            className="mt-2 inline-block text-base text-[#98d2c0] underline decoration-[#98d2c0]/45 underline-offset-4 hover:text-[#c5eae9] md:text-lg"
                            href={smileyLinkUrl}
                          >
                            {smileyLinkLabel}
                          </a>
                        ) : (
                          <p className="mt-2 text-base text-[#98d2c0] underline decoration-[#98d2c0]/45 underline-offset-4">
                            {smileyLinkLabel}
                          </p>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {featuredReview && (
              <div className="relative lg:ml-auto lg:w-full lg:max-w-184">
                <div className="absolute top-8 -right-3 hidden h-[78%] w-full rounded-4xl bg-[#caded9]/55 lg:block" />
                <figure className="relative rounded-[1.75rem] border border-[#caded9]/15 bg-[#203b35] p-8 shadow-2xl shadow-black/25 md:p-10">
                  <div
                    className="flex gap-1 text-[#2f685a]"
                    aria-label={`${featuredRating} ud af ${MAX_STARS} stjerner`}
                  >
                    {Array.from({ length: MAX_STARS }).map((_, index) => (
                      <Icon
                        className={`size-2.5 fill-current${index + 1 > Math.round(featuredRating) ? 'opacity-30' : ''}`}
                        key={index}
                        name="star"
                      />
                    ))}
                  </div>

                  <blockquote className="mt-8 max-w-136 text-lg leading-relaxed text-[#e0f5f0]/90 italic">
                    &quot;{featuredReview.quote}&quot;
                  </blockquote>

                  <div className="mt-12 border-t border-[#caded9]/15 pt-8">
                    <figcaption>
                      <p className="text-sm font-semibold text-[#98d2c0]">{featuredReview.name}</p>
                      {featuredReview.source && (
                        <p className="mt-1 text-[10px] tracking-[0.16em] text-[#caded9]/65 uppercase">
                          {featuredReview.source}
                        </p>
                      )}
                    </figcaption>
                  </div>

                  <span
                    aria-hidden="true"
                    className="absolute right-8 bottom-8 text-6xl leading-none font-extrabold text-[#2f685a]/35"
                  >
                    &quot;
                  </span>
                </figure>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
