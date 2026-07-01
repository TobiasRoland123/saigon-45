import { getCachedGlobal } from '@/utilities/getGlobals'
import React from 'react'

import { CMSLink } from '@/components/Link'
import Link from 'next/link'

export async function Footer() {
  const footerData = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  const logoSize = 28

  return (
    <footer className="mt-auto border-t border-border bg-black dark:bg-card text-white">
      <div className="container py-8 gap-8 flex flex-col md:grid md:grid-rows-auto md:grid-cols-12 md:justify-between">
        {/* <Link className="flex items-center" href="/">
          <Logo />
        </Link> */}
        <div className="flex flex-col items-start gap-4 md:col-start-1 md:col-end-7 md:row-start-1 md:row-end-2">
          <h3>Saigon 45</h3>
          <p>
            Din lokale destination for autentisk asiatisk takeaway og forfriskende bubble tea i
            hjertet af Rødovre.
          </p>
          <span>&copy; 2024 Saigon 45 - Rødovre Centrum. Fresh Asian Fusion & Bubble Tea.</span>
        </div>

        <div className="flex flex-col items-start gap-4 md:col-start-7 md:col-end-10 md:row-start-1 md:row-end-2">
          <p className="underline underline-offset-1 decoration-accent">Kontakt & info</p>
          <ul>
            <li>Rødovre Centrum</li>
            <li>
              <a href="tel:+4518689280">+45 28 68 92 80</a>
            </li>
            <li>
              <p>Man-Lør: 10.00 - 20.00</p>
              <p>Søndag: 10.00 - 19.00</p>
            </li>
          </ul>
        </div>

        <div className="flex flex-col items-start gap-4 md:col-start-10 md:col-end-13 md:row-start-1 md:row-end-2">
          <p className="underline underline-offset-1 decoration-accent">Følg os</p>
          <Link
            href="https://www.facebook.com/profile.php?id=100085443011562"
            className="flex items-center justify-center p-2 rounded-md bg-accent/20 hover:bg-accent/30 hover:curs transition-colors"
            target="_blank"
          >
            <div className="bg-white rounded-full">
              <svg
                role="img"
                width={logoSize}
                height={logoSize}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <title>Facebook</title>
                <path
                  fill="#0866FF"
                  d="M9.101 23.691v-7.98H6.627v-3.667h2.474v-1.58c0-4.085 1.848-5.978 5.858-5.978.401 0 .955.042 1.468.103a8.68 8.68 0 0 1 1.141.195v3.325a8.623 8.623 0 0 0-.653-.036 26.805 26.805 0 0 0-.733-.009c-.707 0-1.259.096-1.675.309a1.686 1.686 0 0 0-.679.622c-.258.42-.374.995-.374 1.752v1.297h3.919l-.386 2.103-.287 1.564h-3.246v8.245C19.396 23.238 24 18.179 24 12.044c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.628 3.874 10.35 9.101 11.647Z"
                />
              </svg>
            </div>
          </Link>
        </div>

        <div className="flex w-full flex-col items-start gap-4 md:col-start-1 md:col-end-7 md:row-start-2 md:row-end-3">
          <p className="underline underline-offset-1 decoration-accent">Links</p>
          {/* <ThemeSelector /> */}
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
