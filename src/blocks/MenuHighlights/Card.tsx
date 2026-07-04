import Link from 'next/link'
import React from 'react'

export type MenuHighlightCardProps = {
  badge?: string | null
  description: string
  image: React.ReactNode
  imageLabel?: string | null
  link?: {
    href?: string | null
    label?: string | null
    newTab?: boolean | null
  }
  title: string
}

export const MenuHighlightCard: React.FC<MenuHighlightCardProps> = ({
  badge,
  description,
  image,
  imageLabel,
  link,
  title,
}) => {
  const newTabProps = link?.newTab ? { rel: 'noopener noreferrer', target: '_blank' } : {}

  return (
    <article className="group flex min-h-[34rem] overflow-hidden rounded-lg border border-outline-variant bg-surface-container-lowest shadow-[0_10px_34px_rgba(12,31,28,0.08)] transition-transform duration-200 hover:-translate-y-1 hover:shadow-[0_16px_44px_rgba(12,31,28,0.13)]">
      <div className="flex w-full flex-col">
        <div className="relative aspect-[1.36] overflow-hidden bg-surface-container">
          {image}

          {badge && (
            <span className="text-on-secondary absolute top-5 right-5 rounded-full bg-secondary px-5 py-2 text-sm font-bold tracking-wide uppercase shadow-sm">
              {badge}
            </span>
          )}

          {imageLabel && (
            <div className="absolute inset-x-6 bottom-6 rounded-lg bg-white/90 px-5 py-3 text-center text-xl font-bold text-primary shadow-sm backdrop-blur-sm md:text-2xl">
              {imageLabel}
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-8 md:p-10">
          <h3 className="text-3xl leading-tight font-bold text-primary md:text-4xl">{title}</h3>
          <p className="mt-6 text-lg leading-relaxed text-on-surface-variant md:text-xl">
            {description}
          </p>

          {link?.href && (
            <Link
              className="mt-auto inline-flex pt-12 text-xl font-bold text-primary no-underline hover:text-primary/80"
              href={link.href}
              {...newTabProps}
            >
              {link.label}
              <span aria-hidden="true">-&gt;</span>
            </Link>
          )}
        </div>
      </div>
    </article>
  )
}
