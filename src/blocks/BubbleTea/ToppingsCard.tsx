import React from 'react'

type Props = {
  heading: string
  items: { id?: string | null; label: string }[]
  priceLabel: string
}

export const ToppingsCard: React.FC<Props> = ({ heading, items, priceLabel }) => (
  <div className="rounded-xl bg-surface-container-lowest p-8 shadow-[0_10px_34px_rgba(12,31,28,0.08)] md:p-10">
    <div className="flex flex-wrap items-center justify-between gap-4">
      <h3 className="text-2xl leading-tight font-extrabold text-primary md:text-3xl">{heading}</h3>
      <span className="rounded-full bg-secondary-container px-5 py-2 text-sm font-bold text-on-secondary-container md:text-base">
        {priceLabel}
      </span>
    </div>

    <ul className="mt-8 flex flex-wrap gap-3">
      {items.map((item, index) => (
        <li
          className="rounded-md bg-primary/10 px-4 py-2 text-sm text-on-surface md:text-base"
          key={item.id ?? index}
        >
          {item.label}
        </li>
      ))}
    </ul>
  </div>
)
