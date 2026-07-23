import type { FindUsBlock as FindUsBlockProps } from '@/payload-types'
import type { IconName } from '@/components/icons'

import { getCachedGlobal } from '@/utilities/getGlobals'
import { formatWeekSummary } from '@/OpeningHours/formatWeekSummary'
import { formatPhoneHref, formatPhoneNumber } from '@/utilities/formatPhoneNumber'
import { Media } from '@/components/Media'
import { Icon } from '@/components/icons'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/utilities/ui'

// A labelled row: circular icon chip + bold label + free-form content lines.
const InfoRow = ({
  icon,
  label,
  children,
}: {
  icon: IconName
  label: string
  children: React.ReactNode
}) => (
  <div className="flex gap-5">
    <div className="grid size-14 shrink-0 place-items-center rounded-2xl bg-on-primary-fixed/10 text-on-primary-container">
      <Icon name={icon} className="size-8" />
    </div>
    <div>
      <dt className="text-xl font-bold text-on-primary-container">{label}</dt>
      <dd className="mt-1 space-y-0.5 text-lg leading-relaxed text-on-primary-fixed/80">
        {children}
      </dd>
    </div>
  </div>
)

// Async server component: address, hours and phone come from the shared
// Business Info global; only presentation fields live on the block. Pages
// are statically prerendered, so this runs at build/revalidate time — the
// global's afterChange hook revalidates `global_business-info`, so CMS
// edits show up without a rebuild. Degrades to heading + image if the
// global is empty.

export const FindUsBlock = async (props: FindUsBlockProps) => {
  const { heading, addressLabel, hoursLabel, contactLabel, buttonLabel, media } = props

  const businessInfo = await getCachedGlobal('business-info', 0)()
  const { address, contact, openingHours } = businessInfo ?? {}
  const hoursLines = formatWeekSummary(openingHours)
  const phone = contact?.phone ? formatPhoneNumber(contact.phone) : null

  return (
    <section className="mt-24 bg-primary-fixed/45 py-16 md:py-24">
      <div className="container grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <h2 className="text-4xl leading-tight font-extrabold text-on-primary-container md:text-5xl">
            {heading}
          </h2>

          <dl className="mt-10 space-y-8">
            <InfoRow icon="mapPin" label={addressLabel}>
              {address?.street && <p>{address.street}</p>}
              {address?.zipCity && <p>{address.zipCity}</p>}
              {address?.extraDetails && <p>{address.extraDetails}</p>}
            </InfoRow>

            {hoursLines.length > 0 && (
              <InfoRow icon="clock" label={hoursLabel}>
                {hoursLines.map((line) => (
                  <p key={line.days}>
                    {line.days}: {line.hours ?? 'Lukket'}
                  </p>
                ))}
              </InfoRow>
            )}

            {phone && (
              <InfoRow icon="phone" label={contactLabel}>
                <a href={formatPhoneHref(phone)} className="hover:underline">
                  {phone}
                </a>
              </InfoRow>
            )}
          </dl>

          {address?.googleMapsUrl && (
            <a
              href={address.googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(buttonVariants({ size: 'xl' }), 'mt-12 px-10')}
            >
              {buttonLabel}
              <Icon name="externalLink" className="size-5" />
            </a>
          )}
        </div>

        <div className="relative aspect-4/3 w-full overflow-hidden rounded-[1.75rem] shadow-xl shadow-black/10">
          <Media
            fill
            imgClassName="object-cover"
            resource={media}
            size="(max-width: 1024px) 100vw, 50vw"
          />
        </div>
      </div>
    </section>
  )
}
