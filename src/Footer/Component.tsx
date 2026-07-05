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
    <footer className="mt-auto border-t border-border bg-primary dark:bg-card text-white">
      <div className="container pt-10 pb-16 gap-8 flex flex-col md:grid md:grid-rows-auto md:grid-cols-12 md:justify-between">
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
            <p className="underline underline-offset-3 decoration-primary-muted text-primary-muted uppercase">
              Kontakt & info
            </p>
            <ul className="[&>li]:leading-10 [&>a]:leading-10">
              <li>{contactData?.ContactAddress}</li>
              {normalizedPhone && (
                <li>
                  <a href={`tel:${normalizedPhone.replaceAll(' ', '')}`}>{normalizedPhone}</a>
                </li>
              )}
              {contactData.ContactOpeningHouse && (
                <li>
                  <RichText
                    className="[&>p]:leading-10 "
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
            <p className="underline underline-offset-3 decoration-primary-muted text-primary-muted uppercase">
              Følg os
            </p>
            <div className="flex flex-wrap items-start gap-4">
              {socialMediaData?.map((item) => {
                if (!item.platform || !item.url) return null

                return (
                  <Link
                    key={item.id}
                    href={item.url}
                    className="flex items-center justify-center p-2 rounded-md bg-white/10 hover:bg-white/20 hover:curser transition-colors"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <SocialIcon className="w-7 h-7 text-white" platform={item.platform} />
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        <div className="flex w-full flex-col items-start gap-4 md:col-start-1 md:col-end-7 md:row-start-2 md:row-end-3">
          <p className="underline underline-offset-3 decoration-primary-muted text-primary-muted uppercase">
            Links
          </p>
          <nav className="flex flex-col md:flex-row md:w-full md:justify-between gap-4">
            {navItems.map(({ link }, i) => {
              return <CMSLink className="text-white" key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
