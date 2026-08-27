import React from 'react'

type Props = {
  heading: string
  items: { id?: string | null; label: string }[]
  priceLabel: string
}

export const ToppingsCard: React.FC<Props> = ({ heading, items, priceLabel }) => (
  <div className="rounded-xl bg-surface-container-lowest p-6 shadow-[0_10px_34px_rgba(12,31,28,0.08)] sm:p-8 md:p-10">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h3 className="text-2xl leading-tight font-extrabold text-primary md:text-3xl">{heading}</h3>
      <span className="rounded-full bg-secondary-container px-5 py-2 text-sm font-bold text-on-secondary-container md:text-base">
        {priceLabel}
      </span>
    </div>

    <ul className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-3 md:mt-8 md:grid-cols-4 lg:grid-cols-5">
      {items.map((item, index) => (
        <li
          className="flex min-h-10 min-w-0 items-center justify-center rounded-md bg-primary/10 px-2 py-1.5 text-center text-xs leading-tight font-medium break-words text-on-surface sm:px-3 md:text-sm"
          key={item.id ?? index}
        >
          {item.label}
        </li>
      ))}
    </ul>
  </div>
)
