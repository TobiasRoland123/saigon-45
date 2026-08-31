'use client'

import React, { createContext, useCallback, useState } from 'react'

import type { Theme, ThemeContextType } from './types'

import canUseDOM from '@/utilities/canUseDOM'
import { getImplicitPreference, themeLocalStorageKey } from './shared'

const initialContext: ThemeContextType = {
  setTheme: () => null,
  theme: undefined,
}

const ThemeContext = createContext(initialContext)

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  // `InitTheme` writes `data-theme` before hydration, so the attribute is
  // already authoritative when this mounts and needs no effect to re-derive it.
  const [theme, setThemeState] = useState<Theme | undefined>(
    canUseDOM ? (document.documentElement.getAttribute('data-theme') as Theme) : undefined,
  )

  const setTheme = useCallback((themeToSet: Theme | null) => {
    if (themeToSet === null) {
      window.localStorage.removeItem(themeLocalStorageKey)
      const implicitPreference = getImplicitPreference()
      document.documentElement.setAttribute('data-theme', implicitPreference || '')
      if (implicitPreference) setThemeState(implicitPreference)
    } else {
      setThemeState(themeToSet)
      window.localStorage.setItem(themeLocalStorageKey, themeToSet)
      document.documentElement.setAttribute('data-theme', themeToSet)
    }
  }, [])

  return <ThemeContext value={{ setTheme, theme }}>{children}</ThemeContext>
}
