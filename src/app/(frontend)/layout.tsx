import type { Metadata } from 'next'

import { Plus_Jakarta_Sans } from 'next/font/google'
import React from 'react'

import { AdminBar } from '@/components/AdminBar'
import { Footer } from '@/Footer/Component'
import { Header } from '@/Header/Component'
import { Providers } from '@/providers'
import { InitTheme } from '@/providers/Theme/InitTheme'
import { mergeOpenGraph } from '@/utilities/mergeOpenGraph'
import { DEFAULT_META_DESCRIPTION, SITE_NAME } from '@/utilities/siteMetadata'
import { draftMode } from 'next/headers'

import './globals.css'
import { getServerSideURL } from '@/utilities/getURL'

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-plus-jakarta-sans',
  weight: ['400', '600', '700', '800'],
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled } = await draftMode()

  return (
    <html className={plusJakartaSans.variable} lang="da" suppressHydrationWarning>
      <head>
        <InitTheme />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:rounded-md focus:bg-surface focus:px-4 focus:py-2 focus:font-semibold focus:text-on-surface focus:shadow-lg"
        >
          Gå til indhold
        </a>
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          <main id="main" className="grow">
            {children}
          </main>
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  // Last-resort defaults for routes that export no `generateMetadata` of their
  // own, such as the 404 page. CMS pages go through `generateMeta`, which
  // supplies the same fallbacks itself — a route that returns `undefined` for a
  // field strips the value here rather than inheriting it.
  description: DEFAULT_META_DESCRIPTION,
  icons: {
    apple: '/apple-touch-icon.png',
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/favicon-32.png', sizes: '32x32', type: 'image/png' },
    ],
  },
  metadataBase: new URL(getServerSideURL()),
  openGraph: mergeOpenGraph(),
  title: SITE_NAME,
}
