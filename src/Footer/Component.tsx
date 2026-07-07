import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'
import { formatPhoneNumber } from '@/utilities/formatPhoneNumber'
import { SocialIcon } from '@/components/icons'
import RichText from '@/components/RichText'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const aboutData = footerData?.About && footerData?.About.length > 0 ? footerData.About[0] : null
  const contactData =
    footerData?.ContactAndDetails && footerData?.ContactAndDetails.length > 0
      ? footerData.ContactAndDetails[0]
      : null
  const socialMediaData =
    footerData?.SocialMedia && footerData?.SocialMedia.length > 0 ? footerData.SocialMedia : null

  const navItems = footerData?.navItems || []

  const currentYear = new Date().getFullYear()
  const normalizedPhone = contactData?.ContactPhoneNumber
    ? formatPhoneNumber(contactData.ContactPhoneNumber)
    : null

  return (
    <footer className="mt-auto border-t border-border bg-primary text-white dark:bg-card">
      <div className="md:grid-rows-auto container flex flex-col gap-8 pt-10 pb-16 md:grid md:grid-cols-12 md:justify-between">
        {aboutData && (
          <div className="flex flex-col items-start gap-4 md:col-start-1 md:col-end-7 md:row-start-1 md:row-end-2">
            <p className="text-2xl">{aboutData.AboutLabel}</p>
            <p>{aboutData.AboutSaigon45}</p>
            <span className="text-sm text-primary-muted">
              &copy; {currentYear} {aboutData.AboutCopyRightDetails}
            </span>
          </div>
        )}
        {contactData && (
          <div className="flex flex-col items-start gap-4 md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-2">
            <p className="text-primary-muted uppercase underline decoration-primary-muted underline-offset-3">
              Kontakt & info
            </p>
            <ul className="[&>a]:leading-10 [&>li]:leading-10">
              <li>{contactData?.ContactAddress}</li>
              {normalizedPhone && (
                <li>
                  <a href={`tel:${normalizedPhone.replaceAll(' ', '')}`}>{normalizedPhone}</a>
                </li>
              )}
              {contactData.ContactOpeningHouse && (
                <li>
                  <RichText
                    className="[&>p]:leading-10"
                    data={contactData.ContactOpeningHouse}
                    enableGutter={false}
                    enableProse={false}
                  />
                </li>
              )}
            </ul>
          </div>
        )}

        {socialMediaData && socialMediaData.length > 0 && (
          <div className="flex flex-col items-start gap-4 md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-2">
            <p className="text-primary-muted uppercase underline decoration-primary-muted underline-offset-3">
              Følg os
            </p>
            <div className="flex flex-wrap items-start gap-4">
              {socialMediaData?.map((item) => {
                if (!item.platform || !item.url) return null

                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="hover:curser flex items-center justify-center rounded-md bg-white/10 p-2 transition-colors hover:bg-white/20"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon className="h-7 w-7 text-white" platform={item.platform} />
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex w-full flex-col items-start gap-4 md:col-start-1 md:col-end-7 md:row-start-2 md:row-end-3">
          <p className="text-primary-muted uppercase underline decoration-primary-muted underline-offset-3">
            Links
          </p>
          <nav className="flex flex-col gap-4 md:w-full md:flex-row md:justify-between">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
