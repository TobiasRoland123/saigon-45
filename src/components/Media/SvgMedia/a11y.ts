import type { AriaRole } from 'react'

type InlineSvgA11yProps = { 'aria-hidden': true } | { role: AriaRole; 'aria-label': string }

/**
 * Resolves the accessibility props for an inline (DOM-injected) SVG wrapper.
 *
 * Three cases, because a role-less `<div aria-label>` is a prohibited-ARIA
 * violation and a `role="img"` with an empty name is announced as a useless
 * "unlabelled image":
 *
 * - interactive (has a click handler) → `button` named by `alt`
 * - non-interactive with alt text     → `img` named by `alt`
 * - non-interactive without alt text  → decorative: hidden from assistive tech,
 *   with no role so it is never announced
 */
export const getInlineSvgA11yProps = ({
  alt,
  interactive,
}: {
  alt: string
  interactive: boolean
}): InlineSvgA11yProps => {
  if (interactive) return { role: 'button', 'aria-label': alt }
  if (alt !== '') return { role: 'img', 'aria-label': alt }
  return { 'aria-hidden': true }
}
