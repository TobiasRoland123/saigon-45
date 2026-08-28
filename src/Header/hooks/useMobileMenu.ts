'use client'

import { useCallback, useEffect, useState } from 'react'

/**
 * Open/close state for the mobile header menu. While open it locks body scroll
 * and closes on Escape, so the drop-down panel behaves like an overlay.
 */
export const useMobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false)

  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen((open) => !open), [])

  useEffect(() => {
    if (!isOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false)
    }
    document.addEventListener('keydown', closeOnEscape)

    return () => {
      document.body.style.overflow = previousOverflow
      document.removeEventListener('keydown', closeOnEscape)
    }
  }, [isOpen])

  return { close, isOpen, toggle }
}
