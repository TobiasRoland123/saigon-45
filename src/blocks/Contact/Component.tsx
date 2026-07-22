import type { ContactBlock as ContactBlockProps } from '@/payload-types'

import { Media } from '@/components/Media'
import { Icon, SocialIcon } from '@/components/icons'
import { formatPhoneHref, formatPhoneNumber } from '@/utilities/formatPhoneNumber'
import { getCachedGlobal } from '@/utilities/getGlobals'
import { cn } from '@/utilities/ui'

type Props = ContactBlockProps & {
  className?: string
}

const ContactRow = ({
  href,
  icon,
  label,
  value,
}: {
  href: string
  icon: 'mail' | 'phone'
  label: string
  value: string
}) => (
  <div className="flex items-center gap-5">
    <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
      <Icon name={icon} className="size-8" />
    </div>
    <div>
      <p className="text-sm font-extrabold tracking-[0.12em] text-on-surface-variant uppercase">
        {label}
      </p>
      <a
        className="mt-1 inline-block text-xl font-bold text-on-primary-container hover:underline"
        href={href}
      >
        {value}
      </a>
    </div>
  </div>
)

export const ContactBlock = async ({
  className,
  description,
  emailLabel,
  heading,
  media,
  phoneLabel,
}: Props) => {
  const businessInfo = await getCachedGlobal('business-info', 0)()
  const phone = businessInfo?.contact?.phone
    ? formatPhoneNumber(businessInfo.contact.phone)
    : undefined
  const email = businessInfo?.contact?.email
  const socialMedia =
    businessInfo?.socialMedia?.filter((social) => social.platform && social.url) ?? []

  return (
    <section className={cn('container py-12 md:py-20', className)}>
      <div className="grid overflow-hidden rounded-4xl bg-surface-container-lowest shadow-[0_24px_60px_rgba(12,31,28,0.16)] lg:grid-cols-2 lg:rounded-[3rem]">
        <div className="order-2 px-6 py-12 sm:px-10 md:px-16 md:py-16 lg:order-1 lg:px-20 lg:py-24">
          <div className="max-w-xl">
            <h2 className="text-4xl leading-tight font-extrabold text-primary md:text-5xl">
              {heading}
            </h2>
            <p className="mt-7 text-lg leading-relaxed text-on-surface-variant md:text-xl">
              {description}
            </p>

            {(phone || email) && (
              <div className="mt-12 space-y-8">
                {phone && (
                  <ContactRow
                    href={formatPhoneHref(phone)}
                    icon="phone"
                    label={phoneLabel}
                    value={phone}
                  />
                )}
                {email && (
                  <ContactRow
                    href={`mailto:${email}`}
                    icon="mail"
                    label={emailLabel}
                    value={email}
                  />
                )}
              </div>
            )}

            {socialMedia.length > 0 && (
              <div className="mt-10 flex items-center gap-4">
                <div className="grid size-16 shrink-0 place-items-center rounded-full bg-primary text-primary-foreground">
                  <Icon name="share" className="size-7" />
                </div>
                <div className="flex flex-wrap gap-3">
                  {socialMedia.map((social) => (
                    <a
                      aria-label={social.platform}
                      className="grid size-14 place-items-center rounded-xl border border-outline/70 text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                      href={social.url}
                      key={social.id ?? social.url}
                      rel="noopener noreferrer"
                      target="_blank"
                    >
                      <SocialIcon platform={social.platform} className="size-6" />
                    </a>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="relative order-1 min-h-80 lg:order-2 lg:min-h-full">
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
