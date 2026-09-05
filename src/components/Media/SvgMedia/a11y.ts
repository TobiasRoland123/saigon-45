import type { AriaRole } from 'react'

type InlineSvgA11yProps = { 'aria-hidden': true } | { role: AriaRole; 'aria-label': string }

/**
 * Resolves the accessibility props for an inline (DOM-injected) SVG wrapper.
 *
 * Three cases, because a role-less `<div aria-label>` is a prohibited-ARIA
 * violation and a `role="img"` with an empty name is announced as a useless
 * "unlabelled image":
 *
 * - interactive → decorative: the surrounding native `<button>`/`<a>` carries the
 *   accessible name, so the graphic itself must not be announced a second time
 * - non-interactive with alt text → `img` named by `alt`
 * - non-interactive without alt text → decorative: hidden from assistive tech,
 *   with no role so it is never announced
 */
export const getInlineSvgA11yProps = ({
  alt,
  interactive,
}: {
  alt: string
  interactive: boolean
}): InlineSvgA11yProps => {
  if (interactive) return { 'aria-hidden': true }
  if (alt !== '') return { role: 'img', 'aria-label': alt }
  return { 'aria-hidden': true }
}

/**
 * Resolves the accessible name for a requested interactive SvgMedia, or null when it
 * must not render as a control.
 *
 * A `<button>`/`<a>` whose only content is a graphic has no visible text, so it is
 * named solely by its `aria-label`: a blank or whitespace-only name leaves assistive
 * tech announcing a bare "button" (WCAG 4.1.2 Name, Role, Value). TypeScript already
 * requires `altOverride` alongside `onClick`/`href`, but it cannot see that the value
 * came from a Media record an editor left blank — so this also fails closed at
 * runtime, in every environment: the caller falls back to a plain, static graphic
 * rather than shipping a nameless control. Development additionally gets a console
 * error naming the cause.
 */
export const resolveInteractiveName = ({
  alt,
  requested,
}: {
  alt: string
  requested: boolean
}): string | null => {
  if (!requested) return null

  const label = alt.trim()
  if (label !== '') return label

  if (process.env.NODE_ENV !== 'production') {
    console.error(
      '[SvgMedia] A clickable SvgMedia has no accessible name, so it rendered as a static ' +
        'graphic instead. Pass a non-empty `altOverride`, or set the `alt` field on the ' +
        'Media record.',
    )
  }

  return null
}
