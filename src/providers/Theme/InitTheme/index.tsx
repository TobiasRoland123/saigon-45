import React from 'react'
import Script from 'next/script'

import { themeLocalStorageKey } from '../ThemeSelector/types'

export const InitTheme: React.FC = () => {
  return (
    <Script
      dangerouslySetInnerHTML={{
        __html: `
      (function () {
        // Force light mode and persist it so other scripts/components read the same.
        try {
          document.documentElement.setAttribute('data-theme', 'light');
          window.localStorage.setItem('${themeLocalStorageKey}', 'light');
        } catch (e) {
          // ignore (e.g. SSR or localStorage blocked)
        }
      })();
    `,
      }}
      id="theme-script"
    />
  )
}
