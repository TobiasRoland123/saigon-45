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
        <Providers>
          <AdminBar
            adminBarProps={{
              preview: isEnabled,
            }}
          />

          <Header />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  )
}

export const metadata: Metadata = {
  // Inherited by any route that does not export its own `generateMetadata`,
  // such as the 404 page. Routes that do still override these.
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
